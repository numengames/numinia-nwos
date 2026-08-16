export interface Decision {
  id: string;
  titulo: string;
  fecha: string;
  estado: "activa" | "provisional" | "supersedida";
  area: string;
  contexto: string;
  decision: string;
  porQue: string[];
  alternativas: string[];
  prosContras: { pros: string[]; contras: string[] };
  pendienteDarkCouncil?: boolean;
}

export const decisiones: Decision[] = [
  {
    id: "DEC-001",
    titulo: "Self-hosting sobre SaaS para infraestructura",
    fecha: "2026-04-03",
    estado: "activa",
    area: "Infraestructura / Filosofía",
    contexto: "Numen Games necesitaba analytics y sistema de contacto para pablofm.com. Las opciones eran servicios SaaS o soluciones self-hosted.",
    decision: "Self-hosting. Umami para analytics, Cal.com para reservas, ambos en el servidor propio.",
    porQue: [
      "Filosofía ZK de Pablo: los datos no deben salir de donde no necesitan salir",
      "Coste 0 vs. SaaS de pago a escala",
      "Coherencia con los valores de Numinia: soberanía digital",
    ],
    alternativas: [
      "Google Analytics — cede datos a Google, requiere banner de cookies",
      "Formspree — sin control, endpoint puede desaparecer",
      "Calendly — de pago a partir de cierto uso",
    ],
    prosContras: {
      pros: ["Control total de datos", "Privacidad real", "Coste operativo 0"],
      contras: ["Mantenimiento propio", "Requiere infraestructura operativa"],
    },
  },
  {
    id: "DEC-002",
    titulo: "Construir en público con licencia CC0",
    fecha: "2026-04-02",
    estado: "activa",
    area: "Estrategia / Cultura",
    contexto: "Numen Games necesitaba definir el nivel de apertura de su trabajo — código, documentación, framework.",
    decision: "Todo el framework de Numinia y la documentación es CC0. El código es MIT. Construimos en abierto.",
    porQue: [
      "El modelo es replicable — eso es una feature, no un riesgo",
      "La transparencia radical genera comunidad y credibilidad",
      "Coherente con 'remix culture' declarado en los seminales",
      "Reduce la fricción de adopción para nuevas organizaciones",
    ],
    alternativas: [
      "Propietario — contradice la filosofía y limita la adopción",
      "Creative Commons BY — añade fricción de atribución innecesaria",
    ],
    prosContras: {
      pros: ["Comunidad", "Credibilidad", "Adopción libre"],
      contras: ["Cualquiera puede replicar el modelo sin pagar"],
    },
  },
  {
    id: "DEC-003",
    titulo: "Arbitrum como blockchain de Numinia",
    fecha: "2026-04-05",
    estado: "provisional",
    area: "Producto / Tech",
    contexto: "Numinia necesita una blockchain para NFTs, smart contracts de sellos y Digital Goods.",
    decision: "Arbitrum One (L2 sobre Ethereum).",
    porQue: [
      "Fees muy bajos — viable para microtransacciones",
      "EVM compatible — stack conocido, Solidity, herramientas maduras",
      "Ecosistema de grants activo (AGV, DAO Grants)",
      "Propiedad de su comunidad (DAO governance)",
    ],
    alternativas: [
      "Ethereum mainnet — fees prohibitivos para el caso de uso",
      "Solana — ecosistema diferente, menos tooling EVM",
      "Polygon — similar pero ecosistema de grants menos activo en gaming",
      "Base / Optimism — válidos, menor tracción en gaming",
    ],
    prosContras: {
      pros: ["Fees bajos", "Grants disponibles", "EVM conocido"],
      contras: ["Menor velocidad que Solana", "Dependencia del ecosistema Ethereum"],
    },
    pendienteDarkCouncil: true,
  },
  {
    id: "DEC-004",
    titulo: "Arquitectura CAO híbrida",
    fecha: "2026-04-05",
    estado: "activa",
    area: "CAO / Sistema de agentes",
    contexto: "La CAO necesitaba definir cómo operar los agentes digitales. ¿Sesiones persistentes o subagentes bajo demanda?",
    decision: "Arquitectura híbrida: subagentes efímeros para misiones ahora, sesiones persistentes cuando el sistema madure.",
    porQue: [
      "Los subagentes funcionan hoy sin configuración adicional (probado con MIS-001)",
      "Las sesiones persistentes requieren más infraestructura",
      "Mínima complejidad que funciona — no sobreingeniería prematura",
      "El sistema de misiones .md funciona igual con ambos modelos",
    ],
    alternativas: [
      "Sesiones persistentes desde el inicio — riesgo de romper config, coste fijo sin uso",
      "Un solo agente generalista — no escala, pierde especialización",
    ],
    prosContras: {
      pros: ["Funciona hoy", "Coste proporcional al uso", "Sin riesgo de config"],
      contras: ["Sin memoria entre misiones (mitigado con briefing protocolo)"],
    },
  },
  {
    id: "DEC-005",
    titulo: "pablofm.com como portal público de la CAO",
    fecha: "2026-04-03",
    estado: "activa",
    area: "Producto / Comunicación",
    contexto: "Numen Games necesitaba una superficie pública para mostrar la actividad de la CAO.",
    decision: "Usar pablofm.com como portal temporal mientras se construye la plataforma Numinia.",
    porQue: [
      "pablofm.com ya existía con infraestructura funcional",
      "Construir en abierto desde el primer día — no esperar a que todo esté listo",
      "Pablo como cara visible de Numen Games en esta fase temprana",
      "Coste 0 adicional",
    ],
    alternativas: [
      "Esperar a numengames.com — meses de retraso, pierde el momentum",
      "Subdominio dedicado (cao.numengames.com) — más infra sin beneficio claro ahora",
    ],
    prosContras: {
      pros: ["Visibilidad inmediata", "Momentum", "Sin coste adicional"],
      contras: ["Mezcla marca personal con CAO de empresa (temporal)"],
    },
  },
];

export const pendientesDecisiones = [
  { titulo: "¿Avatares soulbound o transferibles?", area: "Producto / NFT", urgencia: "Alta" },
  { titulo: "¿Supply máximo de Prism Cells?", area: "Tokenomics", urgencia: "Media" },
  { titulo: "¿DB operativa centralizada o por organización?", area: "Arquitectura", urgencia: "Media" },
  { titulo: "¿Frameworks propios como tipo documental nuevo?", area: "Documentación", urgencia: "Baja" },
];
