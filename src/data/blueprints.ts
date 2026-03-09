export type Blueprint = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  tags: string[];
  category: string;
};

export const blueprints: Blueprint[] = [
  {
    slug: "cvss-ubuntu-telegram",
    title: "CVSS Ubuntu → Telegram",
    summary: "Monitoriza avisos de seguridad de Ubuntu y notifícalos en Telegram filtrando por CVSS. Detección de vulnerabilidades críticas en tiempo real.",
    href: "/blueprints/cvss-ubuntu-telegram",
    tags: ["n8n", "Seguridad", "Ubuntu", "Telegram", "CVSS"],
    category: "Seguridad",
  },
  {
    slug: "wazuh-alerts-telegram",
    title: "Wazuh SIEM → Telegram",
    summary: "Reenvía alertas críticas de Wazuh SIEM a un canal de Telegram con contexto del agente, nivel de criticidad y recomendación de acción.",
    href: "/blueprints/wazuh-alerts-telegram",
    tags: ["n8n", "Wazuh", "SIEM", "Telegram", "Seguridad"],
    category: "Seguridad",
  },
  {
    slug: "osm-local-scraper",
    title: "OSM Scraper → Base de datos",
    summary: "Extrae locales de negocio de OpenStreetMap vía Overpass API, geocodifica direcciones y los importa en Cloudflare D1 listos para consumir.",
    href: "/blueprints/osm-local-scraper",
    tags: ["Python", "OpenStreetMap", "Cloudflare D1", "Scraper"],
    category: "Data",
  },
  {
    slug: "instagram-enricher",
    title: "Instagram Business Enricher",
    summary: "Agente que detecta locales sin Instagram en tu base de datos, busca su perfil, extrae fotos y métricas, y enriquece automáticamente la ficha.",
    href: "/blueprints/instagram-enricher",
    tags: ["Python", "Instagram", "IA", "Cloudflare D1"],
    category: "Data",
  },
  {
    slug: "email-marketing-automation",
    title: "Email Marketing Automation",
    summary: "Pipeline completo con Listmonk + n8n: segmentación por comportamiento, envío en hora óptima y reporte automático de métricas a Telegram.",
    href: "/blueprints/email-marketing-automation",
    tags: ["n8n", "Listmonk", "Email", "Marketing"],
    category: "Marketing",
  },
  {
    slug: "cloudflare-dns-manager",
    title: "Cloudflare DNS Automation",
    summary: "Gestiona registros DNS de múltiples dominios vía API. Actualiza, crea y audita registros programáticamente desde n8n o scripts Python.",
    href: "/blueprints/cloudflare-dns-manager",
    tags: ["n8n", "Cloudflare", "DNS", "DevOps"],
    category: "Infraestructura",
  },
  {
    slug: "ai-content-generator",
    title: "Generador de Contenido IA",
    summary: "Workflow que toma una URL o keyword, investiga con Perplexity, genera el texto con Claude y lo publica en tu CMS o envía por email para revisión.",
    href: "/blueprints/ai-content-generator",
    tags: ["n8n", "Claude", "IA", "Contenido", "CMS"],
    category: "IA",
  },
  {
    slug: "proxmox-monitor",
    title: "Proxmox Monitor → Telegram",
    summary: "Monitorización de VMs y CTs en Proxmox. Alertas de CPU, RAM y disco. Arranque y parada automatizados fuera del horario de uso.",
    href: "/blueprints/proxmox-monitor",
    tags: ["n8n", "Proxmox", "Infraestructura", "Telegram"],
    category: "Infraestructura",
  },
];
