// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
export type NavChild = {
  label: string;
  href: string;
  id: string;
};

export type NavItem =
  // a plain link
  | { label: string; href: string; id: string; children?: never; section?: never }
  // a hand-written dropdown
  | { label: string; href?: never; id: string; children: NavChild[]; section?: never }
  // a corpus section: the dropdown is its folder, listed at build time
  | { label: string; href: string; id: string; section: string; children?: never };

export const navItems: NavItem[] = [
  { label: "Missions", href: "/missions", id: "missions" },
  // One entry per top-level folder of the repository that publishes documents.
  // The order is the reading order declared in @/lib/corpus SECTIONS: what is
  // settled first, what is known to be wrong last.
  { label: "Canon", href: "/corpus/canon/", id: "canon", section: "canon" },
  { label: "Standards", href: "/corpus/standards/", id: "standards", section: "standards" },
  { label: "Decisions", href: "/corpus/decisions/", id: "decisiones", section: "decisions" },
  { label: "Protocols", href: "/corpus/protocols/", id: "protocols", section: "protocols" },
  { label: "Blueprints", href: "/corpus/blueprints/", id: "planos", section: "blueprints" },
  { label: "Debt", href: "/corpus/debt/", id: "debt", section: "debt" },
  { label: "Corpus", href: "/corpus", id: "corpus" },
  // /reports is no longer listed. The page still builds and still answers at
  // its URL — as with the thirteen MIS-110 retired, this removes the nav entry,
  // not the route.
];
