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
    slug: "tresycuarto",
    title: "tresycuarto.com",
    summary: "Plataforma de tardeo en España gestionada por agentes IA: 63 ciudades, 10.000+ locales enriquecidos con Google Places, Reels automáticos publicados en Instagram y newsletter diaria personalizada. Coste operativo cero.",
    href: "/blueprints/tresycuarto",
    tags: ["Next.js", "Cloudflare D1", "Python", "Google Places", "Instagram API", "edge-tts"],
    category: "IA + Web",
  },
  {
    slug: "lamevaescola",
    title: "lamevaescola.com",
    summary: "Plataforma de herramientas para docentes: 9 utilidades de aula (generador de rúbricas, exámenes, planes de lección...). Landing estática en Cloudflare Pages con newsletter vía Brevo.",
    href: "/blueprints/lamevaescola",
    tags: ["HTML", "Cloudflare Pages", "Brevo", "Educación"],
    category: "Web",
  },
  {
    slug: "elmeuinstitut",
    title: "elmeuinstitut.com",
    summary: "Plataforma educativa para institutos (ESO, Batxillerat, FP). Herramientas específicas por etapa educativa, desplegada en Cloudflare Pages con dominio propio.",
    href: "/blueprints/elmeuinstitut",
    tags: ["HTML", "Cloudflare Pages", "Educación", "ESO", "FP"],
    category: "Web",
  },
  {
    slug: "waveshare-weather-station",
    title: "Estación meteorológica Waveshare",
    summary: "Estación meteorológica con pantalla táctil 7\" en ESP32-S3. Sensor DHT11 interior, datos exteriores de Open-Meteo API, UI con LVGL y actualización OTA. Funcionando en Vinaròs.",
    href: "/blueprints/waveshare-weather-station",
    tags: ["ESP32-S3", "LVGL", "C++", "PlatformIO", "IoT"],
    category: "Hardware / IoT",
  },
  {
    slug: "riego-controller",
    title: "Controlador de riego FERTICONTROL",
    summary: "Sistema de fertirrigación industrial con pantalla táctil 7\", 30 programas independientes, 8 zonas vía RS-485 Modbus, fases automáticas (pre-riego / abono / post-riego) y watchdog de seguridad.",
    href: "/blueprints/riego-controller",
    tags: ["ESP32-S3", "LVGL", "Modbus RS-485", "C++", "PlatformIO", "IoT"],
    category: "Hardware / IoT",
  },
  {
    slug: "ubuntu-corp-iso",
    title: "ISO corporativa Ubuntu 24.04",
    summary: "ISO Ubuntu Desktop 24.04 para despliegue corporativo 100% automático: USB → instalación sin intervención. LUKS, 7 idiomas, NetworkManager, drivers Nvidia en first-boot.",
    href: "/blueprints/ubuntu-corp-iso",
    tags: ["Ubuntu", "Autoinstall", "LUKS", "DevOps", "Linux"],
    category: "Infraestructura",
  },
];
