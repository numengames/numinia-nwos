# Templates — the copy-from library

One template per registered series, consolidated here so a new document of
any series starts from a canonical mould instead of archaeology.

`templates/` is apparatus (MIS-142): scaffolding a document is copied from,
never a member of any series and never published. Licence regime: CC0-1.0
(REUSE.toml).

## Series → template map

| Series | Template | What it scaffolds |
|---|---|---|
| Missions | `MIS-TEMPLATE` | A mission file — the ten build-verified fields + Scope / Acceptance criteria / Closure |
| Missions (design record) | `MIS-TEMPLATE-CHANGES` | The figures that rebuilt the v2 mission template |
| Missions (filled example) | `MIS-TEMPLATE-EXAMPLE` | A real small mission written with the template |
| Standards | `STD-TEMPLATE.md` | A standard — the five required sections (STD-004 §10) |
| Protocols | `PRO-TEMPLATE` | A protocol — what an actor executes in a repeated situation |
| Decisions | `ADR-TEMPLATE` | An ADR — why something was chosen over the alternatives |
| Debt | `DBT-TEMPLATE` | A debt entry — what is known to be missing or wrong |
| Reports | `RPT-TEMPLATE` | A report — what was observed, signed, and dated |
| Operations | `OPS-TEMPLATE` | An operations record — what sustains the business |
| Canon | `CAN-TEMPLATE` | A canon document — what the system IS |
| Blueprints | `BLU-TEMPLATE` | A blueprint — what could be, and the gap it attacks |
| System | `SYS-TEMPLATE` | A system reference — how the system works today |
| Guilds | `GLD-TEMPLATE` | A guild charter — identity and operational profile |

## Agents

The agent scaffold lives in `agents/_template/` (it is a directory scaffold,
not a single document, and `agents/` is outside the filename scheme per
ADR-005 v1.1.0). Copy it when creating a new agent.

## Using a template

1. Copy the template to the target folder with the correct filename
   (ADR-005: 4-digit zero-padded for missions, 3-digit for everything else).
2. Fill the frontmatter contract — every field the series requires, derived
   from the live corpus (headers of actual documents), not invented.
3. Fill the body sections the template defines.
4. Run the guards (`node scripts/lint-frontmatter.mjs`,
   `node scripts/lint-naming.mjs`, `node scripts/check-references.mjs`,
   `node scripts/check-license-frontmatter.mjs`) before pushing.

## Adding a new template

When a new series is registered (STD-001 §2, rules.json `series`), add its
template here and update this README. The template carries the series' real
frontmatter contract and required structure, derived from the live corpus.
