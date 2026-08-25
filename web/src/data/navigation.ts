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
  { label: "Corpus", href: "/corpus", id: "corpus" },
  { label: "Decisiones", href: "/decisiones", id: "decisiones" },
  { label: "Planos", href: "/planos", id: "planos" },
  { label: "Reportes", href: "/reportes", id: "reportes" },
  // MIS-111 — `/corpus` returns to the nav, and this time it leads somewhere.
  // MIS-110 retired it with the other twelve because it was a page nobody
  // could navigate: section indexes existed and listed nothing. Now each
  // section is a real index, and /corpus is the entry point to all six.
  //
  // MIS-110 — the "Sistema" dropdown and its thirteen entries were retired
  // from the nav on 2026-08-25:
  //
  //   /agente  /archive  /audits  /cao  /continuidad  /corpus
  //   /diseno  /gaps     /idioma  /simulaciones  /soluciones
  //   /ventas  /wardley
  //
  // NOTHING WAS DELETED. Every one of those pages still builds and still
  // answers at its URL — they stopped being listed, not being served. Ten of
  // the thirteen are orphan pages holding prose that exists in no .md
  // (D-032), so deleting the file would destroy the only copy. Removing the
  // nav entry gets the intended effect with none of that risk; deletion is a
  // separate decision, to be taken with the classification in hand.
];
