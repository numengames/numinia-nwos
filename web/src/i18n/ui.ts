// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// MIS-120(b) — the UI dictionary. One flat record per locale, typed keys:
// a key missing from `es` is a TypeScript error at build, not a silent
// English leak at runtime. ~120 strings when phase (c) completes the sweep;
// this file starts with the chrome + the pilot pages and grows with (c).
//
// Rule: pages and components never hardcode reader-visible UI text — they
// call t("key"). Document CONTENT is never translated here (that is the
// corpus, phase (d)); this dictionary is chrome only.

export const languages = { en: "English", es: "Español" } as const;
export type Locale = keyof typeof languages;
export const defaultLocale: Locale = "en";

const en = {
  // — navigation chrome —
  "nav.missions": "Missions",
  "nav.corpus": "Corpus",
  "nav.decisions": "Decisions",
  "nav.blueprints": "Blueprints",
  "nav.reports": "Reports",
  "nav.openMenu": "Open menu",
  "nav.langSelector": "Language",

  // — footer —
  "notice.machineTranslation": "Machine translation. The English document is the record of registry.",
  "notice.readOriginal": "Read the original",
  "notice.model": "Model",
  "footer.navigation": "Navigation",
  "footer.legal": "Legal",
  "footer.social": "Social",

  // — site search (SiteSearch.astro) —
  "search.label": "Search",
  "search.aria": "Site search",
  "search.placeholder": "Search the archive…",

  // — speech player (SpeechPlayer.astro, phase c wires these) —
  "speech.listen": "Listen",
  "speech.pause": "Pause",
  "speech.resume": "Resume",
  "speech.stop": "Stop listening",
  "speech.listenAria": "Listen to this document",
  "speech.pauseAria": "Pause listening",
  "speech.resumeAria": "Resume listening",
  "speech.noEngine": "This browser has no speech synthesis",
  "speech.nothing": "Nothing to read on this page",
  "speech.rateAria": "Playback rate: {rate}x. Press to change",
  "speech.min": "min",

  // — doc toolbar —
  "toolbar.copy": "Copy",
  "toolbar.copied": "Copied",
  "toolbar.error": "Error",
  "toolbar.copyAria": "Copy raw markdown",
  "toolbar.downloadAria": "Download {file}",

  // — missions board (pilot page) —
  "board.searchPlaceholder": "Search missions — ID, title, assignee, guild…",
  "board.searchAria": "Search missions",
  "board.clearAria": "Clear search",
  "board.about": "About",
  "board.costLegend": "Cost legend",
  "board.effort": "Effort",
  "board.guild": "Guild",
  "board.priority": "Priority",
  "board.status": "Status",
  "board.filter.all": "All",
  "board.filter.inProgress": "In Progress",
  "board.filter.inReview": "In Review",
  "board.filter.critical": "Critical",
  "board.filter.high": "High",
  "board.filter.medium": "Medium",
  "board.filter.low": "Low",
  "board.col.inProgress": "In progress",
  "board.col.inReview": "In review",
  "board.col.backlog": "Backlog",
  "board.col.done": "Done",
  "board.col.frozen": "Frozen",
  "board.completed": "Completed",

  // — corpus index (pilot page) —
  "corpus.title": "Corpus",
  "corpus.intro": "The archive as it is served: every published document, by section.",
  "corpus.root": "root",

  // — home (pilot page) —
  "home.whatItIs": "What it is",
  "home.whyItMatters": "Why it matters",
  "home.features": "Features",
  "home.architecture": "Architecture",
  "home.designPrinciples": "Design principles",
  "home.implementation": "Implementation",
  "home.requirements": "Requirements",
  "home.reference": "Reference implementation",
  "home.narrativeLayer": "About the Narrative Layer",
  "home.active": "Active",
  "home.optional": "Optional",
  "home.fields": "Fields:",

  // — machine-translation notice (phase d mounts it; key lives here now) —
  "mt.notice":
    "Machine translation — the English original is the document of record.",
} as const;

// `satisfies` forces es to carry EXACTLY the same keys as en.
const es = {
  "nav.missions": "Misiones",
  "nav.corpus": "Corpus",
  "nav.decisions": "Decisiones",
  "nav.blueprints": "Planos",
  "nav.reports": "Reportes",
  "nav.openMenu": "Abrir menú",
  "nav.langSelector": "Idioma",

  "notice.machineTranslation": "Traducción automática. El documento inglés es el registro oficial.",
  "notice.readOriginal": "Leer el original",
  "notice.model": "Modelo",
  "footer.navigation": "Navegación",
  "footer.legal": "Legal",
  "footer.social": "Social",

  "search.label": "Buscar",
  "search.aria": "Búsqueda del sitio",
  "search.placeholder": "Buscar en el archivo…",

  "speech.listen": "Escuchar",
  "speech.pause": "Pausa",
  "speech.resume": "Reanudar",
  "speech.stop": "Detener la lectura",
  "speech.listenAria": "Escuchar este documento",
  "speech.pauseAria": "Pausar la lectura",
  "speech.resumeAria": "Reanudar la lectura",
  "speech.noEngine": "Este navegador no tiene síntesis de voz",
  "speech.nothing": "No hay nada que leer en esta página",
  "speech.rateAria": "Velocidad de lectura: {rate}x. Pulsa para cambiar",
  "speech.min": "min",

  "toolbar.copy": "Copiar",
  "toolbar.copied": "Copiado",
  "toolbar.error": "Error",
  "toolbar.copyAria": "Copiar el markdown original",
  "toolbar.downloadAria": "Descargar {file}",

  "board.searchPlaceholder": "Buscar misiones — ID, título, asignado, gremio…",
  "board.searchAria": "Buscar misiones",
  "board.clearAria": "Limpiar búsqueda",
  "board.about": "Acerca de",
  "board.costLegend": "Leyenda de costes",
  "board.effort": "Esfuerzo",
  "board.guild": "Gremio",
  "board.priority": "Prioridad",
  "board.status": "Estado",
  "board.filter.all": "Todas",
  "board.filter.inProgress": "En curso",
  "board.filter.inReview": "En revisión",
  "board.filter.critical": "Críticas",
  "board.filter.high": "Altas",
  "board.filter.medium": "Medias",
  "board.filter.low": "Bajas",
  "board.col.inProgress": "En curso",
  "board.col.inReview": "En revisión",
  "board.col.backlog": "Pendientes",
  "board.col.done": "Hechas",
  "board.col.frozen": "Congeladas",
  "board.completed": "Completada",

  "corpus.title": "Corpus",
  "corpus.intro": "El archivo tal como se sirve: todos los documentos publicados, por sección.",
  "corpus.root": "raíz",

  "home.whatItIs": "Qué es",
  "home.whyItMatters": "Por qué importa",
  "home.features": "Funciones",
  "home.architecture": "Arquitectura",
  "home.designPrinciples": "Principios de diseño",
  "home.implementation": "Implementación",
  "home.requirements": "Requisitos",
  "home.reference": "Implementación de referencia",
  "home.narrativeLayer": "Sobre la Capa Narrativa",
  "home.active": "Activa",
  "home.optional": "Opcional",
  "home.fields": "Campos:",

  "mt.notice":
    "Traducción automática — el original inglés es el documento de registro.",
} as const satisfies Record<keyof typeof en, string>;

export const ui = { en, es } as const;
export type UIKey = keyof typeof en;

/** Resolve the locale Astro reports into a dictionary lookup. */
export function useT(locale: string | undefined) {
  const l: Locale = locale === "es" ? "es" : "en";
  return (key: UIKey, vars?: Record<string, string>): string => {
    let s: string = ui[l][key] ?? ui.en[key];
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
    return s;
  };
}

/** The same path in the other locale — the selector is a link, not state. */
export function localePaths(pathname: string) {
  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  const enPath = isEs ? pathname.replace(/^\/es(\/|$)/, "/") || "/" : pathname;
  const esPath = isEs ? pathname : pathname === "/" ? "/es/" : "/es" + pathname;
  return { enPath, esPath, current: (isEs ? "es" : "en") as Locale };
}
