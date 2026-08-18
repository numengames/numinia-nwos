// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
export type NavChild = {
  label: string;
  href: string;
  id: string;
};

export type NavItem =
  | { label: string; href: string; id: string; children?: never }
  | { label: string; href?: never; id: string; children: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Missions", href: "/missions", id: "missions" },
  { label: "Decisiones", href: "/decisiones", id: "decisiones" },
  { label: "Planos", href: "/planos", id: "planos" },
  { label: "Reportes", href: "/reportes", id: "reportes" },
  {
    label: "Sistema",
    id: "numinia",
    children: [
      { label: "Agente", href: "/agente", id: "agente" },
      { label: "Archive", href: "/archive", id: "archive" },
      { label: "Audits", href: "/audits", id: "audits" },
      { label: "CAO", href: "/cao", id: "cao" },
      { label: "Continuidad", href: "/continuidad", id: "continuidad" },
      { label: "Corpus", href: "/corpus", id: "corpus" },
      { label: "Diseño", href: "/diseno", id: "diseno" },
      { label: "Gaps", href: "/gaps", id: "gaps" },
      { label: "Idioma", href: "/idioma", id: "idioma" },
      { label: "Simulaciones", href: "/simulaciones", id: "simulaciones" },
      { label: "Soluciones", href: "/soluciones", id: "soluciones" },
      { label: "Ventas", href: "/ventas", id: "ventas" },
      { label: "Wardley", href: "/wardley", id: "wardley" },
    ],
  },
];
