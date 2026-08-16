export interface Plano {
  id: string;
  titulo: string;
  descripcion: string;
  area: string;
  version: string;
  fecha: string;
  estado: "activo" | "pendiente" | "obsoleto";
  lore: string;
  estadoActual: string[];
  estadoObjetivo: string[];
  decisiones: string[];
  delta: { brecha: string; mision: string }[];
  preguntas: string[];
  dependencias: string[];
  semaforo: "verde" | "amarillo" | "rojo";
}

export const planos: Plano[] = [
  {
    id: "infraestructura",
    titulo: "Infraestructura",
    descripcion: "Servidor, servicios, puertos, DNS y stack de operaciones.",
    area: "Ops",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "Plano recuperado de los registros técnicos de la CAO. Documenta la arquitectura física sobre la que Numinia opera.",
    semaforo: "amarillo",
    estadoActual: [
      "VPS 161.35.215.224 — 7.8GB RAM, 4 CPUs, 154GB disco",
      "Umami Analytics corriendo en :3001 (sin SSL, sin subdominio)",
      "Cal.com corriendo en :3002 (sin SSL, sin subdominio)",
      "Sin Nginx — acceso por IP:puerto",
      "Sin Ollama — sin modelos locales",
    ],
    estadoObjetivo: [
      "Nginx como reverse proxy con SSL (Let's Encrypt)",
      "analytics.pablofm.com → Umami",
      "cal.pablofm.com → Cal.com",
      "Ollama con Qwen2.5:7B y Llama3.2:3B",
      "PC dedicado cuando llegue — migrar toda la infra",
    ],
    decisiones: [
      "Self-hosting sobre SaaS: control de datos, filosofía ZK, coste 0 en servicios",
      "Docker Compose por servicio: aislamiento, fácil de mantener",
      "PostgreSQL sobre MongoDB: relacional, fiable, mejor para joins",
    ],
    delta: [
      { brecha: "Puertos 3001/3002 cerrados en firewall", mision: "Abrir ufw allow 3001/tcp + 3002/tcp" },
      { brecha: "Sin Nginx/SSL", mision: "MIS-016" },
      { brecha: "Sin subdominios DNS", mision: "Configurar con proveedor DNS" },
      { brecha: "Sin Ollama", mision: "Pendiente — elevated permisos" },
    ],
    preguntas: [
      "¿Cuál es el proveedor DNS de pablofm.com?",
      "¿Cuándo llega el PC dedicado?",
    ],
    dependencias: ["plano-web", "plano-cao"],
  },
  {
    id: "cao",
    titulo: "CAO — Organización Autónoma Centralizada",
    descripcion: "Arquitectura de agentes digitales, capas, protocolos y modelos.",
    area: "CAO",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "El plano central de la CAO. Define cómo los agentes digitales coordinan el trabajo de Numinia mientras los Oráculos descansan.",
    semaforo: "amarillo",
    estadoActual: [
      "Centinela-01: activo, claude-sonnet-4.6",
      "Alquimista-01, Exegeta-01, Procurador-01: SOUL.md creados, sin sesiones",
      "Procyon: diseñado para 2028",
      "Subagentes efímeros como mecanismo de coordinación provisional",
      "Sin repo numinia-agents",
    ],
    estadoObjetivo: [
      "5 agentes con sesiones persistentes en OpenClaw",
      "Repo numinia-agents como fuente de verdad",
      "Briefing Protocol v1.0 activo",
      "Logs auditables por misión",
      "Procyon coordinando la capa de inteligencia",
    ],
    decisiones: [
      "Arquitectura híbrida: subagentes efímeros ahora, sesiones persistentes cuando el sistema madure",
      "Modelo por tarea: Haiku para rutinas (<$0.01), Sonnet para razonamiento complejo",
      "Confirmación humana para acciones externas: Ley 1 siempre activa",
    ],
    delta: [
      { brecha: "Sin repo numinia-agents", mision: "MIS-037" },
      { brecha: "Sin Briefing Protocol", mision: "MIS-038" },
      { brecha: "Sin logs automáticos", mision: "MIS-039" },
      { brecha: "Sin KPIs medibles", mision: "MIS-040" },
    ],
    preguntas: [
      "¿Procyon puede activar agentes sin OK de Oráculo?",
      "¿Los ciudadanos pueden proponer misiones a los agentes?",
      "¿Techo de coste mensual de la CAO?",
    ],
    dependencias: ["plano-misiones", "plano-repo"],
  },
  {
    id: "web",
    titulo: "Webs",
    descripcion: "pablofm.com como portal CAO y numengames.com como web corporativa.",
    area: "Producto",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "Plano de las superficies digitales de Numen Games. La cara visible del sistema.",
    semaforo: "verde",
    estadoActual: [
      "pablofm.com: 10 páginas, 14 PRs, Umami activo, Cal.com integrado",
      "numengames.com: Astro 4.16, 5/10 en auditoría técnica",
      "DESIGN.md: sistema de diseño completo para agentes",
      "Cucumber BDD: 10 escenarios de tests",
    ],
    estadoObjetivo: [
      "pablofm.com: portal público completo de la CAO",
      "numengames.com: migrado a Astro 5, i18n nativo, Schema.org",
      "Ambas webs con Nginx + SSL",
    ],
    decisiones: [
      "Astro 5 sobre Next.js: SSG por defecto, bundle mínimo, componentes islas",
      "pablofm.com como portal CAO temporal: construir en abierto desde el primer día",
      "DESIGN.md como sistema: cualquier agente puede generar UI coherente",
    ],
    delta: [
      { brecha: "og-default.png no existe", mision: "Crear 1200×630px" },
      { brecha: "GitHub no en social links", mision: "PR pendiente" },
      { brecha: "numengames.com al 5/10", mision: "MIS-027 + MIS-011" },
      { brecha: "Sin Umami en numengames", mision: "MIS-014" },
    ],
    preguntas: [
      "¿Modo papiro + toggle dark/light en pablofm.com?",
      "¿numengames.com migra a Vercel o se hospeda en el servidor propio?",
    ],
    dependencias: ["plano-infraestructura"],
  },
  {
    id: "misiones",
    titulo: "Sistema de Misiones",
    descripcion: "Arquitectura del sistema de misiones, estados, tipos y flujo.",
    area: "CAO",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "En Numinia, las misiones son el pulso del trabajo. Este plano documenta cómo se crean, asignan, ejecutan y archivan.",
    semaforo: "amarillo",
    estadoActual: [
      "50 misiones en backlog (archivos .md locales)",
      "MIS-001 completada (primer experimento multiagente)",
      "Mission_Template v0.2.0 + DoD v0.2.0 creados",
      "Tablero público en pablofm.com/misiones",
      "Sin repo público como fuente de verdad",
    ],
    estadoObjetivo: [
      "Cada misión = .md en repo numinia-agents",
      "pablofm.com/misiones lee GitHub API en tiempo real",
      "Sistema de estados actualizable por agentes via PR",
    ],
    decisiones: [
      ".md por misión: legible por humanos y agentes, versionable en git",
      "Tipos 🧬/🤖/🔀: explicitan el coste y colaboración antes de activar",
      "Valor epistémico + pragmático obligatorio: la documentación tiene valor por sí misma",
    ],
    delta: [
      { brecha: "Misiones en archivos locales", mision: "MIS-037 — migrar a numinia-agents" },
      { brecha: "Sin estado actualizable en web", mision: "GitHub API cuando exista el repo" },
      { brecha: "MIS-002 a 050 sin páginas de detalle", mision: "Completar datos en misiones.ts" },
    ],
    preguntas: [
      "¿Las misiones tienen épicas o sprints?",
      "¿Quién puede crear misiones además de Oráculos?",
    ],
    dependencias: ["plano-repo", "plano-cao"],
  },
  {
    id: "repo",
    titulo: "Repositorios",
    descripcion: "Estructura de repos, convenciones de naming y flujo de trabajo.",
    area: "Ops",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "El archivo de código de Numinia. Todo lo que se construye, se guarda aquí.",
    semaforo: "amarillo",
    estadoActual: [
      "PabloFMM/pablofm-web: activo, 14+ PRs, CI via Vercel",
      "numengames/numengames-web: Astro 4, necesita mejoras",
      "numengames/numinia-oncyber: componentes Oncyber",
      "numengames/alchemists-tower: plataforma mundos virtuales",
      "numinia-agents: NO EXISTE",
    ],
    estadoObjetivo: [
      "numinia-agents: repo público CC0 con todos los agentes, misiones y seminales",
      "READMEs con tríada OS→Modelo→Narrativa en todos los repos",
      "Licencia CC0 declarada explícitamente",
    ],
    decisiones: [
      "Convención naming: numengames-* (empresa/OS) vs numinia-* (ciudad/plataforma)",
      "Construir en público: CC0, transparencia radical",
      "Branch protection + PR obligatorio: nunca push directo a main",
    ],
    delta: [
      { brecha: "numinia-agents no existe", mision: "MIS-037" },
      { brecha: "PAT sin scope workflow", mision: "Activar en GitHub Settings" },
      { brecha: "READMEs sin tríada", mision: "MIS-046" },
    ],
    preguntas: [
      "¿numinia-agents en org numengames o en PabloFMM?",
    ],
    dependencias: ["plano-cao"],
  },
  {
    id: "financiero",
    titulo: "Financiero",
    descripcion: "Costes operativos, fuentes de ingreso y pipeline de financiación.",
    area: "Negocio",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "El plano que nadie quiere ver pero todos necesitan. Sin recursos, Numinia no crece.",
    semaforo: "rojo",
    estadoActual: [
      "Bootstrapping puro — sin inversión externa",
      "Ingresos: formaciones Web3/metaverso (puente)",
      "Costes digitales: ~$40-80/mes (Anthropic API)",
      "Acumulado primeros 3 días: ~$55 (fase intensiva)",
      "Sin sistema de medición de costes reales",
    ],
    estadoObjetivo: [
      "Sistema de costes por agente activo (MIS-048)",
      "Grant Arbitrum enviado y en evaluación",
      "Primer cliente pagando por Numinia framework",
      "Runway de 6+ meses cubierto",
    ],
    decisiones: [
      "Haiku para rutinas, Sonnet para razonamiento: optimización de costes por modelo",
      "Ollama local cuando esté disponible: coste 0 para tareas ligeras",
      "Grants antes que inversión: no dilución en fase temprana",
    ],
    delta: [
      { brecha: "Sin medición de costes reales", mision: "MIS-048" },
      { brecha: "Grant Arbitrum sin enviar", mision: "MIS-031" },
      { brecha: "Sin deck para inversores", mision: "MIS-034" },
      { brecha: "Sin pricing definido", mision: "MIS-021" },
    ],
    preguntas: [
      "¿Cuál es el runway actual en meses?",
      "¿Fecha cierre fiscal para reporte anual?",
      "¿El plano financiero es público completo o con datos redactados?",
    ],
    dependencias: ["plano-cao", "plano-misiones"],
  },
  {
    id: "datos",
    titulo: "Modelo de Datos",
    descripcion: "Arquitectura híbrida NFT on-chain + DB off-chain para los objetos de Numinia.",
    area: "Producto / Tech",
    version: "v0.1.0",
    fecha: "2026-04-05",
    estado: "activo",
    lore: "El Registro Akáshico no miente. Todo lo que existe en Numinia deja una huella. Los datos son esa huella.",
    semaforo: "amarillo",
    estadoActual: [
      "Modelo conceptual diseñado — sin implementación",
      "Sin smart contracts",
      "Sin DB operativa para Numinia",
      "Sin indexador (The Graph)",
    ],
    estadoObjetivo: [
      "Smart contracts ERC-721/1155 en Arbitrum Sepolia (Milestone 1)",
      "Metadata en IPFS/Arweave",
      "The Graph indexando eventos on-chain",
      "PostgreSQL como capa operativa sincronizada",
    ],
    decisiones: [
      "Arbitrum L2: fees bajos, EVM compatible, ecosistema de grants",
      "Burn-and-Mint para upgrades: el historial del objeto queda on-chain para siempre",
      "On-chain gana siempre: la DB es una caché, el NFT es la verdad",
    ],
    delta: [
      { brecha: "Sin smart contracts", mision: "MIS-037 → contratos en /numinia-contracts" },
      { brecha: "Sin ERD completo", mision: "Diseñar en Dark Council" },
      { brecha: "Sin API", mision: "Pendiente cuando existan contratos" },
    ],
    preguntas: [
      "¿Los avatares de ciudadano son soulbound o transferibles?",
      "¿Los Prism Cells tienen supply máximo?",
      "¿La DB operativa la gestiona Numen Games o hay un nodo por organización?",
    ],
    dependencias: ["plano-infraestructura", "plano-misiones"],
  },
];
