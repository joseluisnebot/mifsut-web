#!/usr/bin/env python3
"""
add_blueprint.py — Automatiza la publicación de un nuevo blueprint en mifsut.com

Uso:
    python3 scripts/add_blueprint.py blueprints/mi-blueprint.json [--no-deploy]

El JSON de blueprint debe seguir el esquema de blueprints/template.json.
El script:
  1. Valida el JSON
  2. Genera src/app/blueprints/{slug}/page.tsx
  3. Actualiza src/data/blueprints.ts
  4. git commit + push
  5. SSH a la VM → git pull + npm run deploy (salvo --no-deploy)
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
BLUEPRINTS_TS = ROOT / "src/data/blueprints.ts"
PAGES_DIR = ROOT / "src/app/blueprints"

VM_USER = "ubuntu"
VM_HOST = "192.168.1.150"
VM_KEY = "/root/.ssh/tresycuarto_vm"
VM_REPO = "~/mifsut-web"

REQUIRED_FIELDS = ["slug", "title", "summary", "category", "tags"]

# ---------------------------------------------------------------------------
# Validación
# ---------------------------------------------------------------------------

def validate(data: dict) -> None:
    for field in REQUIRED_FIELDS:
        if field not in data:
            sys.exit(f"ERROR: campo obligatorio ausente → '{field}'")
    if not re.match(r'^[a-z0-9-]+$', data["slug"]):
        sys.exit("ERROR: slug solo puede contener letras minúsculas, números y guiones")
    page_dir = PAGES_DIR / data["slug"]
    if page_dir.exists():
        sys.exit(f"ERROR: ya existe una página para el slug '{data['slug']}'")


# ---------------------------------------------------------------------------
# Generador de page.tsx
# ---------------------------------------------------------------------------

def build_page(data: dict) -> str:
    slug = data["slug"]
    title = data["title"]
    summary = data["summary"]
    description_meta = data.get("description_meta", summary)
    category = data["category"]

    # Construye secciones opcionales
    sections = []

    # Métricas
    metrics = data.get("metrics", [])
    if metrics:
        items = "\n".join(
            f'          <div key="{m["label"]}" className="text-center">\n'
            f'            <p className="text-2xl font-bold gradient-text">{m["value"]}</p>\n'
            f'            <p className="text-xs text-neutral-500 mt-1">{m["label"]}</p>\n'
            f'          </div>'
            for m in metrics
        )
        sections.append(f'''
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resultados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
{items}
        </div>
      </section>''')

    # Descripción
    desc = data.get("description", "")
    if desc:
        sections.append(f'''
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Descripción</h2>
        <p className="text-neutral-400 leading-relaxed">{desc}</p>
      </section>''')

    # Agentes
    agents = data.get("agents", [])
    if agents:
        agent_items = "\n".join(
            f'            <div key="{a["name"]}" className="border-l-2 border-indigo-500/30 pl-4">\n'
            f'              <div className="flex items-start justify-between gap-2 mb-1">\n'
            f'                <code className="text-sm font-mono text-indigo-300">{a["name"]}</code>\n'
            f'                <span className="text-xs text-neutral-600 shrink-0">{a.get("cron","")}</span>\n'
            f'              </div>\n'
            f'              <p className="text-sm text-neutral-400 leading-relaxed mb-1">{a["desc"]}</p>\n'
            f'              <p className="text-xs text-neutral-600">Modelo: {a.get("model","—")}</p>\n'
            f'            </div>'
            for a in agents
        )
        sections.append(f'''
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Agentes IA</h2>
        <div className="space-y-5">
{agent_items}
        </div>
      </section>''')

    # Stack
    stack = data.get("stack", [])
    if stack:
        rows = "\n".join(
            f'              <tr key="{s["name"]}" className="border-b border-white/5 last:border-0">\n'
            f'                <td className="py-2.5 font-mono text-indigo-300 pr-4">{s["name"]}</td>\n'
            f'                <td className="py-2.5 text-neutral-500">{s["role"]}</td>\n'
            f'              </tr>'
            for s in stack
        )
        sections.append(f'''
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Stack técnico</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
{rows}
            </tbody>
          </table>
        </div>
      </section>''')

    # Pipeline
    pipeline = data.get("pipeline", [])
    if pipeline:
        steps = "\n".join(
            f'            <li key="{i}" className="flex gap-3 text-sm text-neutral-400">\n'
            f'              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-bold">{i+1}</span>\n'
            f'              {step}\n'
            f'            </li>'
            for i, step in enumerate(pipeline)
        )
        sections.append(f'''
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Pipeline</h2>
        <ol className="space-y-3">
{steps}
        </ol>
      </section>''')

    # Enlace live
    link_live = data.get("link_live", "")
    link_github = data.get("link_github", "")
    header_links = ""
    if link_live or link_github:
        btns = []
        if link_live:
            btns.append(f'          <a href="{link_live}" target="_blank" className="rounded-xl px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition">Ver proyecto →</a>')
        if link_github:
            btns.append(f'          <a href="{link_github}" target="_blank" className="rounded-xl px-4 py-2 text-sm font-semibold border border-white/10 hover:border-indigo-500/30 transition">Código fuente</a>')
        header_links = f'\n        <div className="mt-4 flex flex-wrap gap-3">\n' + "\n".join(btns) + '\n        </div>'

    category_color = {
        "Proyectos": "text-amber-400 bg-amber-500/10 border-amber-500/20",
        "Seguridad": "text-red-400 bg-red-500/10 border-red-500/20",
        "Data": "text-blue-400 bg-blue-500/10 border-blue-500/20",
        "Marketing": "text-green-400 bg-green-500/10 border-green-500/20",
        "IA": "text-purple-400 bg-purple-500/10 border-purple-500/20",
        "Infraestructura": "text-orange-400 bg-orange-500/10 border-orange-500/20",
    }.get(category, "text-neutral-400 bg-white/5 border-white/10")

    all_sections = "".join(sections)

    return f'''import type {{ Metadata }} from "next";

export const runtime = "edge";

export const metadata: Metadata = {{
  title: "{title} | MIFSUT",
  description: "{description_meta}",
}};

export default function BlueprintPage() {{
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium {category_color}">
            {category}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          {title}
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          {summary}
        </p>{header_links}
      </header>
{all_sections}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Quieres algo así para tu negocio?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Diseñamos y desplegamos soluciones similares adaptadas a tu sector y escala.
        </p>
        <a
          href="mailto:ventas@mifsut.com"
          className="inline-block rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition"
        >
          Hablemos →
        </a>
      </section>

    </main>
  );
}}
'''


# ---------------------------------------------------------------------------
# Actualizar blueprints.ts
# ---------------------------------------------------------------------------

def update_blueprints_ts(data: dict) -> None:
    content = BLUEPRINTS_TS.read_text()
    tags_str = json.dumps(data["tags"], ensure_ascii=False)
    new_entry = f'''  {{
    slug: "{data["slug"]}",
    title: "{data["title"]}",
    summary: "{data["summary"]}",
    href: "/blueprints/{data["slug"]}",
    tags: {tags_str},
    category: "{data["category"]}",
  }},'''

    # Insertar después de "export const blueprints: Blueprint[] = ["
    marker = "export const blueprints: Blueprint[] = ["
    if marker not in content:
        sys.exit("ERROR: no se encontró el marcador en blueprints.ts")
    content = content.replace(marker, f"{marker}\n{new_entry}", 1)
    BLUEPRINTS_TS.write_text(content)
    print(f"✓ blueprints.ts actualizado con '{data['slug']}'")


# ---------------------------------------------------------------------------
# Git + Deploy
# ---------------------------------------------------------------------------

def git_commit_push(slug: str) -> None:
    env = {**os.environ, "HOME": "/root",
           "GIT_AUTHOR_NAME": "joseluisnebot",
           "GIT_AUTHOR_EMAIL": "JoseluisNebot@gmail.com",
           "GIT_COMMITTER_NAME": "joseluisnebot",
           "GIT_COMMITTER_EMAIL": "JoseluisNebot@gmail.com"}
    subprocess.run(
        ["git", "-C", str(ROOT), "add",
         f"src/app/blueprints/{slug}/page.tsx",
         "src/data/blueprints.ts",
         "src/app/blueprints/page.tsx"],
        check=True, env=env
    )
    subprocess.run(
        ["git", "-C", str(ROOT), "commit", "-m", f"feat: add blueprint '{slug}'"],
        check=True, env=env
    )
    subprocess.run(
        ["git", "-C", str(ROOT), "push"],
        check=True, env=env
    )
    print("✓ git commit + push completado")


def deploy_vm() -> None:
    cf_token = os.environ.get("CLOUDFLARE_API_TOKEN", "")
    cf_account = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")
    if not cf_token or not cf_account:
        sys.exit("ERROR: define CLOUDFLARE_API_TOKEN y CLOUDFLARE_ACCOUNT_ID antes de ejecutar")
    cmd = (
        f"ssh -i {VM_KEY} -o StrictHostKeyChecking=no {VM_USER}@{VM_HOST} "
        f"'cd {VM_REPO} && git pull && "
        f"export CLOUDFLARE_API_TOKEN={cf_token} && "
        f"export CLOUDFLARE_ACCOUNT_ID={cf_account} && "
        f"npm run deploy'"
    )
    print("→ Desplegando en Cloudflare Pages via VM...")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        sys.exit("ERROR: deploy falló")
    print("✓ Deploy completado → https://mifsut.com/blueprints")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Publica un nuevo blueprint en mifsut.com")
    parser.add_argument("json_file", help="Ruta al JSON del blueprint")
    parser.add_argument("--no-deploy", action="store_true", help="Solo genera archivos, sin deploy")
    args = parser.parse_args()

    json_path = Path(args.json_file)
    if not json_path.exists():
        sys.exit(f"ERROR: no se encuentra el archivo '{json_path}'")

    data = json.loads(json_path.read_text(encoding="utf-8"))

    print(f"→ Procesando blueprint: {data.get('slug', '?')}")
    validate(data)

    # Generar página
    page_dir = PAGES_DIR / data["slug"]
    page_dir.mkdir(parents=True, exist_ok=False)
    page_tsx = page_dir / "page.tsx"
    page_tsx.write_text(build_page(data), encoding="utf-8")
    print(f"✓ Página generada → {page_tsx.relative_to(ROOT)}")

    # Actualizar blueprints.ts
    update_blueprints_ts(data)

    if args.no_deploy:
        print("⚠ --no-deploy activado: archivos listos, sin commit ni deploy")
        return

    git_commit_push(data["slug"])
    deploy_vm()
    print(f"\n✅ Blueprint '{data['slug']}' publicado en https://mifsut.com/blueprints/{data['slug']}")


if __name__ == "__main__":
    main()
