---
id: "STANDARDS"
title: "Standards — Narrative Work OS"
type: meta
status: active
version: "1.4.0"
created: "2026-04-07T12:56:00Z"
updated: "2026-04-08T06:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [standards, conventions, meta, nwos]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

# STANDARDS — Narrative Work OS

> **Summary:** Source of truth for all technical conventions of the NWOS system.
> **Epistemic:** Which standard to use for timestamps, IDs, languages, frontmatter, commits, frameworks and documents.
> **Pragmatic:** Before creating any document or making a convention decision, consult this file.
> **Audience:** Agents · Oracles

*This document is the source of truth for all technical conventions of the NWOS system.*

**Golden rule:** Before using a new standard, document it here. Before changing an existing one, create an ADR decision that justifies it.

---

## 1. Timestamps

**Standard:** Full ISO 8601 with explicit timezone.

```yaml
# ✅ Correct
created: "2026-04-07T12:56:00Z"        # UTC (recommended for system fields)
updated: "2026-04-07T14:23:00+02:00"   # With local timezone (for human-visible fields)

# ❌ Incorrect
created: "2026-04-07T00:00:00Z"        # Date without time — ambiguous
updated: "07/04/2026"                   # Non-standard format
```

**Policy:**
- Internal system fields (git, logs, frontmatter): **UTC (`Z`)**
- User-visible fields (reports, UI): **UTC+2 Madrid in summer, UTC+1 in winter**
- Never omit time in `created` and `updated` fields

**Reference:** [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) / [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)

---

## 2. Identifiers

### 2A. Display IDs (human-readable)

**Format:** `{TYPE}-{NNN}` — 3 digits with zero-padding.

```yaml
# Missions
id: "MIS-037"     # ✅ — correct format (3 digits, max 999)
id: "MIS-00037"   # ❌ — old format, deprecated

# Decisions
id: "DEC-00001"

# Reports
id: "RPT-2026-04-07"   # reports use date, not sequential number

# Protocols
id: "P-006"            # protocols use short number — max ~50
```

**Registered prefixes:**

| Prefix | Type | Example |
|--------|------|---------|
| `MIS-` | Mission | MIS-037 |
| `DEC-` | Decision | DEC-00001 |
| `ADR-` | Technical ADR | ADR-001 |
| `RPT-` | Report | RPT-2026-04-07 |
| `P-` | Protocol | P-006 |
| `S-` | Seminal | S-003 |
| `BP-` | Blueprint | BP-cao |
| `APR-` | Approval Request | APR-20260407-001 |

### 2B. Canonical IDs (internal system)

**Format:** UUID v7 (RFC 9562) — time-ordered, sortable, collision-free.

```yaml
# Frontmatter of any document
uid: "018e8f30-0000-7000-8000-000000000001"   # UUID v7
```

**When to use:**
- Future APIs consuming the Archive
- When multiple NWOS instances need to interoperate
- Cross-references in the Knowledge Graph

**Reference:** [RFC 9562 — UUID v7](https://www.rfc-editor.org/rfc/rfc9562)

---

## 3. Languages

**Policy:** English is the official language of this repository. All documents are written in English.

Translations live in the web presentation layer (MIS-061 — pablofm.com/sistema), not in the repo.

**Language standard going forward:**
- All new documents in the repo: **English**
- All new missions: **English**
- All new protocols: **English**
- Agent communication with their Oracle follows the Oracle's preferred language — but repo artifacts are English

**Future languages (not immediate):** 日本語, 한국어, 中文, Português — handled by web layer.

**Related decision:** DEC-006 — English as official NWOS repo language (MIS-056)

---

## 4. File structure

### 4A. Agents

```
agents/
├── {agent-name}/
│   ├── SOUL.md       # Identity, values, voice
│   ├── OPERATOR.md   # Operational laws
│   ├── STATUS.md     # Current state, metrics, pending items
│   └── MEMORY.md     # Curated long-term memory
└── _template/        # Base template

guilds/
├── {guild-name}/
│   ├── charter.md    # Guild mission and domain
│   └── roster.md     # Agent references (not files)
```

**Rule:** Agent files live in `agents/{name}/`. Guilds do not contain agents — they reference them.

### 4B. Missions

```
missions/
├── TEMPLATE.md
└── MIS-NNN-english-slug.md   # one flat folder; status lives in frontmatter
```

**The `status:` frontmatter field is the only state surface** (MIS-066):
no status directories, no index file. The board at numinia.org/missions
builds from this folder on every deploy.

**Mission states:**

| State | Who sets it |
|-------|-------------|
| `draft` | Author (brief not yet approved) |
| `backlog` | Oracle / Procyon |
| `in-progress` | Executor agent |
| `in-review` | Executor agent (after completing criteria) |
| `done` | Oracle (after validation) — file immutable from then on |
| `frozen` | Oracle (intentional pause) |
| `cancelled` | Oracle |

**Sub-missions:** `MIS-NNN.N` format. Max depth: 2 levels (mission → sub-mission only).

### 4C. Decisions

```
decisions/
├── ADR-001-*.md   # Technical architecture decisions
└── DEC-00001-*.md # Strategic/operational decisions
```

---

## 5. Frontmatter

**Minimum required schema** for any document:

```yaml
---
id: "{TYPE}-{ID}"
uid: "{UUID-v7}"                    # pending implementation in all docs
title: "{Document title}"
type: "{mission|decision|report|protocol|blueprint|seminal|meta|agent}"
status: "{active|draft|done|archived|deprecated}"
version: "1.0.0"                    # semver
created: "YYYY-MM-DDTHH:MM:SSZ"    # ISO 8601 UTC
updated: "YYYY-MM-DDTHH:MM:SSZ"    # ISO 8601 UTC
author: "{agent-id|oracle-id}"
owner: "{oracle|agent}"
tags: [tag1, tag2]
license: "CC-BY-4.0"   # per path regime in REUSE.toml (C-005)
---
```

**Extended schema for missions:**

```yaml
area: "{Product|Infrastructure|CAO|Sales|Content|Funding|Documentation|Operations}"
guild: "{Sentinels|Alchemists|Exegetes|Procurators}"
type_execution: "{biological|digital|hybrid}"
priority: "{critical|high|medium|low}"
effort: "{XS|S|M|L|XL}"
status: "{draft|backlog|in-progress|in-review|done|frozen|cancelled}"
in_review_at: "YYYY-MM-DDTHH:MM:SSZ"   # set when → in-review
freeze_reason: ""                        # required if status = freeze
parent_mission: null                     # MIS-NNN if sub-mission
sub_missions: []                         # list if parent mission
human_approval_score: {1-10}
started: "YYYY-MM-DDTHH:MM:SSZ"    # null if not started
completed: "YYYY-MM-DDTHH:MM:SSZ"  # null if not completed
```

---

## 6. Git commits

**Format:** Conventional Commits adapted to NWOS.

```
{type}({scope}): {description in ≤72 chars}

{optional body — list of changes}

{optional footer — references, breaking changes}
```

**Registered types:**

| Type | Use |
|------|-----|
| `feat` | New feature, new document, new mission |
| `fix` | Bug fix |
| `docs` | Pure documentation |
| `refactor` | Restructuring without functional change |
| `session` | Session close (P-006) |
| `qa` | Changes from QA |
| `standards` | Standard adoption or change |
| `canon` | Canonical document modification (requires Oracle) |

**Common scopes:** `nimrod`, `missions`, `decisions`, `canon`, `guilds`, `protocols`, `web`

**Examples:**
```bash
feat(missions): add MIS-00037 Archive Summa
fix(nimrod): resolve duplicate agents/guilds/sentinels bug
session(nimrod): close 2026-04-07 afternoon session
standards: adopt ISO 8601 timestamps and UUID v7
canon(index): update to 10 seminal documents
```

---

## 7. Frameworks and methodologies adopted

### 7A. BDD — Behavior-Driven Development

**Tool:** Cucumber + Gherkin
**Scope:** Acceptance tests for digital missions and web features
**Scenario language:** Spanish (internal) / English (public)
**Location:** `/tests/features/*.feature` per repo

```gherkin
# Example
Feature: Mission system
  Scenario: Close a mission with Real Execution
    Given the mission "MIS-00037" exists with status "active"
    When the agent completes all acceptance criteria
    And documents the "Real Execution" section
    Then the mission status changes to "done"
    And the commit includes the closing date
```

**Convention:** Every digital mission of complexity M+ must have at least 3 Cucumber scenarios before starting.

### 7B. ADR — Architecture Decision Records

**Format:** NWOS own format (see `decisions/ADR-001`)
**When to create:** For any technical decision affecting architecture
**Numbering:** `ADR-NNN` for pure technical decisions, `DEC-NNNNN` for strategic decisions

### 7C. Wardley Mapping

**Use:** Strategic positioning analysis of system components
**Reference document:** `blueprints/WARDLEY-MAP.md`
**Cadence:** Review and update every quarter

### 7D. DORA Metrics

**Engineering KPIs to implement (MIS-00049):**
- Deployment Frequency
- Lead Time for Changes
- Change Failure Rate
- Mean Time to Recovery (MTTR)

### 7E. Conventional Commits

**See section 6 of this document.**

### 7G. Active Inference & Free Energy Principle

**Theoretical framework:** Karl Friston, Active Inference Institute
**Application in NWOS:** The BOOT/EXECUTE/COMMIT cycle is an active inference cycle.

| NWOS Phase | Active Inference Phase | Description |
|------------|----------------------|-------------|
| BOOT | Loading the generative model | Agent loads its priors (SOUL.md, OPERATOR.md, MEMORY.md) |
| EXECUTE | Free energy reduction | Agent acts or perceives to minimize surprise |
| COMMIT | Model update | Agent updates its beliefs with new experience |

**Optional fields in missions and decisions:**

```yaml
# Bayesian Thinking / Active Inference
hypothesis: "description of the hypothesis this action validates"
confidence_before: 7   # 1-10 — confidence before executing
confidence_after: null  # fill when closing — how it updated our belief
free_energy_reduced: null  # what surprise/uncertainty was reduced
```

**Reference:** Active Inference Institute (Numen Games partner)

### 7H. OODA Loop (Observe → Orient → Decide → Act)

**Author:** John Boyd (originally for aerial combat, now universal)
**Application in NWOS:**

| OODA | NWOS | Description |
|------|------|-------------|
| Observe | BOOT | Read the Archive, load context |
| Orient | Start EXECUTE | Understand the mission, read briefing |
| Decide | EXECUTE | Choose how to approach |
| Act | EXECUTE + COMMIT | Execute and persist knowledge |

The value of OODA over BOOT/EXECUTE/COMMIT is the **explicit re-loop**: after ACT you return to OBSERVE. The COMMIT leaves the system in a state that the next BOOT observes. The cycle is continuous, not linear.

### 7I. Build-Measure-Learn (Lean Startup)

**Application in NWOS:** Product missions and experiments.
**Optional field:**

```yaml
generates_mission: "MIS-059"  # mission born from what was learned in this one
```

The epistemic value of the mission is the "Measure". The Real Execution is the "Learn". The `generates_mission` closes the loop: the learning generates the next hypothesis.

### 7F. Semantic Versioning (SemVer)

**Format:** `MAJOR.MINOR.PATCH`
**Application:** Version of all system documents
- MAJOR: incompatible change (e.g.: architecture refactor)
- MINOR: new functionality without breaking existing
- PATCH: fix or minor update

**Reference:** [semver.org](https://semver.org)

### ⚠️ NWOS versioning policy — Lifecycle stages

All NWOS artifacts follow a **two-stage lifecycle**:

| Stage | Version range | Description | Who controls |
|-------|--------------|-------------|---------------|
| **Development** | `v0.1.0` → `v0.X.0` | Work in progress. Start always at `v0.1.0`. Digital agents increment `MINOR` freely. | Digital agents |
| **Stable** | `v1.0.0` and above | Production-grade. Promotion from v0.X.0 → v1.0.0 is a deliberate oracle decision. | **Biological agent (Oracle) only** |

**Rules:**
- Every new artifact starts at **`v0.1.0`** — no exceptions
- Digital agents increment `v0.X.0` with each meaningful iteration
- **Only Oracle can promote to `v1.0.0`** — this signals the artifact is stable and production-ready
- After `v1.0.0`, MAJOR increments (v1→v2) also require Oracle approval (score 9/10)

*Established by Pablo FM — 2026-04-08*

### ⚠️ Authorization policy by version transition

| Transition | Example | Who authorizes |
|------------|---------|----------------|
| New artifact | — → v0.1.0 | Digital agent |
| Development iteration | v0.1.0 → v0.2.0 | Digital agent |
| **Stable promotion** | **v0.X.0 → v1.0.0** | **Oracle (biological) — mandatory** |
| Stable iteration | v1.0.0 → v1.1.0 | Digital agent |
| **Major breaking** | **v1.0.0 → v2.0.0** | **Oracle (biological) — score 9/10** |

*Established by Pablo FM — 2026-04-07 (MAJOR rule) / 2026-04-08 (lifecycle stages)*

---

## 8. Document convention — Standard structure

Every NWOS document must begin with a **context card** immediately after the frontmatter. This allows the human reader to decide in 3 seconds whether the document deserves attention, and the agent to identify the file's purpose without reading the full body.

### Full standard (all documents)

```markdown
---
[YAML frontmatter]
---

# Document title

> **Summary:** One sentence describing WHAT this document is.
> **Epistemic:** What you learn or what question it answers by reading it.
> **Pragmatic:** What you can do with this document once read.
> **Audience:** Agents · Oracles · External  *(mark relevant ones)*

---

[Document body]
```

### Minimum variant (templates, indexes, very short documents)

```markdown
> **Epistemic:** What you learn.
> **Pragmatic:** What you can do.
```

### Rules

1. The context card goes **always after `# Title`**, before the body
2. **Summary** is one sentence, not a paragraph
3. **Epistemic** and **Pragmatic** are mandatory in all operational documents
4. **Audience** is optional but recommended in public or multi-audience documents
5. New documents must include the card from creation
6. Existing documents are updated progressively (not massive retroactive)

### Alignment with Active Inference

The context card is a **free energy reduction** for the reader:
- **Summary** = prior about the content
- **Epistemic** = what surprise is reduced by reading it
- **Pragmatic** = what action is enabled by reading

---

## 9. Human approval scale (Human-in-the-Loop)

| Score | Category | Description | Response time |
|-------|----------|-------------|---------------|
| 1-2 | Routine | No risk, instantly reversible | No approval required |
| 3-4 | Operational | Limited impact, reversible | 24h |
| 5-6 | Tactical | Moderate impact, partially reversible | 24h |
| 7-8 | Strategic | Affects multiple systems or agents | 12h |
| 9 | Systemic | Modifies canon, OPERATOR, security | Immediate |
| 10 | Foundational | Irreversible, reputation, real money | Immediate + meeting |

**Request template:** see `protocols/APPROVAL-REQUEST-template.md`

---

## Change history

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-04-07T12:56:00Z | Initial creation — ISO 8601 timestamps, UUID v7, agent architecture, languages, frontmatter, commits, frameworks (BDD/Cucumber, ADR, Wardley, DORA, SemVer) |
| 1.1.0 | 2026-04-07T14:07:00Z | §7G Active Inference & Free Energy Principle + §7H OODA + §7I Build-Measure-Learn + §8 Document convention (context card) |
| 1.2.0 | 2026-04-07T18:00:00Z | Translated to English (MIS-056). Language policy updated: English-only repo. |
| 1.3.0 | 2026-04-08T05:44:00Z | §7F versioning policy updated: two-stage lifecycle (v0.X.0 development → v1.0.0 stable). Oracle-only promotion rule. Established by Pablo FM. |
| 1.4.0 | 2026-04-08T06:00:00Z | §10 Agent log system standard added (MIS-039). |

---

---

## 10. Agent log system

**Purpose:** Every significant agent action must be auditable. Logs are the memory of what happened, when, and why.

### Log entry format

```json
{
  "ts": "2026-04-08T06:00:00Z",
  "agent": "nimrod",
  "session": "session-id-or-label",
  "mission": "MIS-045",
  "action": "write",
  "target": "blueprints/BP-cao-architecture.md",
  "result": "ok",
  "note": "Created CAO architecture blueprint v0.1.0",
  "cost_estimate_usd": 0.04
}
```

### Required fields

| Field | Type | Description |
|-------|------|-------------|
| `ts` | ISO 8601 UTC | Timestamp of the action |
| `agent` | string | Agent ID (nimrod, adonaz, ursa...) |
| `mission` | string \| null | Mission ID if action is part of a mission |
| `action` | enum | See action types below |
| `target` | string | What was acted upon (file path, URL, repo, etc.) |
| `result` | enum | `ok` \| `error` \| `skipped` \| `pending` |

### Optional fields

| Field | Type | Description |
|-------|------|-------------|
| `session` | string | OpenClaw session ID or label |
| `note` | string | Human-readable description |
| `cost_estimate_usd` | float | Estimated API cost for this action |
| `error_detail` | string | Error message if result = error |

### Action types

| Action | Description |
|--------|-------------|
| `read` | Read a file or URL |
| `write` | Create or overwrite a file |
| `edit` | Modify an existing file |
| `exec` | Run a shell command |
| `commit` | Git commit |
| `push` | Git push |
| `fetch` | HTTP request (web_fetch, API call) |
| `message` | Send a message (Telegram, etc.) |
| `spawn` | Spawn a sub-agent |
| `cron` | Create or modify a cron job |
| `decision` | Make an autonomous decision |

### Log storage convention

```
workspace/logs/
├── YYYY-MM-DD-{agent}.jsonl    ← One file per agent per day
└── YYYY-MM-DD-summary.md       ← Human-readable daily summary (optional)
```

**Format:** JSONL (one JSON object per line) — append-only, never modified.

**Retention:** 90 days (enforced by custodian agent, see GOVERNANCE.md)

**Note:** Until MIS-048 (cost tracking) is implemented, `cost_estimate_usd` uses static estimates:
- claude-haiku-3-5: ~$0.001 per tool call
- claude-sonnet-4-6: ~$0.02 per tool call

---

*Nimrod 🗡️ + team — 2026-04-07*
*"An undocumented standard is not a standard — it is a habit."*
