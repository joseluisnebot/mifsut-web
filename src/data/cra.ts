// Datos del clasificador CRA — Reglamento (UE) 2024/2847 (Reglamento de Ciberresiliencia).
// Categorías: anexo III (productos importantes, clases I y II) y anexo IV (productos críticos).

export type Clase = "fuera" | "defecto" | "importante-1" | "importante-2" | "critico";
export type Papel = "fabricante" | "importador" | "distribuidor";
export type Tamano = "micro" | "pequena" | "mediana-grande";

export const CATEGORIAS: { clase: Exclude<Clase, "fuera" | "defecto">; titulo: string; items: string[] }[] = [
  {
    clase: "importante-1",
    titulo: "Seguridad, red y hogar conectado",
    items: [
      "Gestión de identidades o de accesos privilegiados, incluidos lectores de control de acceso y biométricos",
      "Navegador (independiente o integrado)",
      "Gestor de contraseñas",
      "Antivirus o programa que busca, elimina o pone en cuarentena software malicioso",
      "Red privada virtual (VPN)",
      "Sistema de gestión de red",
      "Gestión de eventos e información de seguridad (SIEM)",
      "Gestor de arranque",
      "Infraestructura de clave pública o emisión de certificados digitales",
      "Interfaz de red física o virtual",
      "Sistema operativo",
      "Router, módem de conexión a internet o conmutador (switch)",
      "Microprocesador, microcontrolador, ASIC o FPGA con funciones de seguridad",
      "Asistente virtual de uso general para el hogar",
      "Hogar conectado con función de seguridad: cerradura, cámara, vigilabebés o alarma",
      "Juguete conectado que habla, graba o localiza",
      "Wearable de seguimiento de la salud (que no sea producto sanitario) o pensado para niños",
    ],
  },
  {
    clase: "importante-2",
    titulo: "Virtualización y protección de red",
    items: [
      "Hipervisor o entorno de ejecución de contenedores",
      "Cortafuegos o sistema de detección o prevención de intrusiones",
      "Microprocesador o microcontrolador resistente a manipulaciones",
    ],
  },
  {
    clase: "critico",
    titulo: "Seguridad avanzada",
    items: [
      "Dispositivo de hardware con caja de seguridad",
      "Pasarela de contadores inteligentes u otro dispositivo de seguridad avanzada o criptoprocesamiento seguro",
      "Tarjeta inteligente o similar, incluidos los elementos seguros",
    ],
  },
];

export const NOMBRE_CLASE: Record<Clase, string> = {
  fuera: "Fuera del reglamento",
  defecto: "Producto por defecto",
  "importante-1": "Producto importante · clase I",
  "importante-2": "Producto importante · clase II",
  critico: "Producto crítico",
};

export const RUTA: Record<Exclude<Clase, "fuera">, string> = {
  defecto:
    "Autoevaluación: tú mismo compruebas y documentas que el producto cumple (control interno, módulo A). No hace falta un tercero.",
  "importante-1":
    "Autoevaluación solo si aplicas por completo normas armonizadas, especificaciones comunes o un esquema europeo de certificación. Si no, tiene que intervenir un organismo notificado.",
  "importante-2":
    "Siempre interviene un tercero: organismo notificado (examen UE de tipo o aseguramiento total de la calidad) o un certificado europeo de ciberseguridad.",
  critico:
    "Certificado europeo de ciberseguridad cuando la Comisión lo exija para tu categoría; hasta entonces, la misma vía que la clase II (organismo notificado).",
};

export const OBLIGACIONES: Record<Papel, string[]> = {
  fabricante: [
    "Evaluación de riesgos de ciberseguridad del producto, por escrito y actualizada.",
    "Cumplir los requisitos esenciales del anexo I: sin vulnerabilidades explotables conocidas, configuración segura de fábrica, actualizaciones de seguridad, control de acceso y protección de los datos.",
    "Lista de componentes de software (SBOM) en formato legible por máquina, al menos con las dependencias directas.",
    "Gestión de vulnerabilidades durante el periodo de soporte: mínimo cinco años, salvo que el producto dure menos. Actualizaciones de seguridad gratuitas.",
    "Punto de contacto y política de divulgación coordinada de vulnerabilidades.",
    "Documentación técnica (anexo VII) y declaración UE de conformidad, conservadas diez años. Marcado CE.",
    "Avisar de vulnerabilidades explotadas activamente e incidentes graves: alerta en 24 horas, notificación en 72 horas e informe final. Obligatorio desde el 11 de septiembre de 2026, también para productos ya vendidos.",
  ],
  importador: [
    "Comprobar antes de vender que el fabricante ha hecho la evaluación de conformidad, tiene la documentación técnica y el producto lleva marcado CE.",
    "Poner tu nombre y dirección de contacto en el producto o en su embalaje.",
    "Guardar diez años una copia de la declaración UE de conformidad y poder entregar la documentación técnica a las autoridades.",
    "Avisar al fabricante de cualquier vulnerabilidad que conozcas, y a las autoridades si hay un riesgo importante.",
    "Si lo vendes con tu marca o lo modificas de forma sustancial, pasas a tener todas las obligaciones del fabricante.",
  ],
  distribuidor: [
    "Comprobar que el producto lleva marcado CE y que fabricante e importador han puesto sus datos y la información obligatoria.",
    "No venderlo si tienes motivos para creer que no cumple, y avisar al fabricante de las vulnerabilidades que conozcas.",
    "Si lo vendes con tu marca o lo modificas de forma sustancial, pasas a tener todas las obligaciones del fabricante.",
  ],
};

export const FECHAS = [
  { fecha: "11 de septiembre de 2026", texto: "Ya en vigor: aviso de vulnerabilidades explotadas e incidentes graves." },
  { fecha: "11 de diciembre de 2027", texto: "Aplicación completa: sin conformidad y marcado CE no se puede vender en la UE." },
];
