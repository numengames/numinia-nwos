---
id: "DBT-019"
uid: ""
title: "Forty-two sections say they are canon and point at a canon that does not contain them"
type: documentation
status: active
version: "0.1.0"
created: "2026-09-07T15:10:00+02:00"
updated: "2026-09-07T15:10:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, design, canon, provenance, axis]
license: "CC-BY-4.0"
severity: high
severity_reason: "the largest standard sends readers to a canon for decisions that canon never made, and the instruction to change them there cannot be followed"
detected: "2026-09-07"
visibility: "restricted-oracle"
visibility_reason: "internal structural debt"
opened_by: "ursa"
related: ["MIS-0146", "STD-008", "CAN-002", "DBT-018"]
---

# DBT-019 — The `[CANON]` marks point at a canon that does not hold them

> **Summary:** `STD-008` carries 42 `[CANON]` marks. The document defines the
> mark as *"stated in the Brand & Culture or a direction decision already taken;
> changed there"*. For the design decisions, **it is not stated there and cannot
> be changed there**, because `CAN-002` does not contain them.
> **Epistemic:** Measured term by term against `CAN-002` at `667cb93`.
> **Pragmatic:** An agent following the instruction literally has nowhere to go.
> **Audience:** Agents · Oracles

---

## 1. What the mark claims

`STD-008` §0.2 defines its provenance marks:

> **[CANON]** stated in the Brand & Culture or a direction decision already
> taken; **changed there**.

So a `[CANON]` mark is a **pointer to another document**, plus an instruction:
if you want this changed, go to `CAN-002` and change it.

## 2. What is actually there

| Term | In `STD-008` | In `CAN-002` |
|---|---:|---:|
| the 40/40/20 mix | 3 | **0** |
| Solarpunk | 2 | **0** |
| SolarSteamCyberPunk | 1 | **0** |
| Umbral register | 23 | **0** |
| Velo register | 42 | **0** |
| low-poly register | 5 | **0** |
| Píxel register | 14 | **0** |

`CAN-002` mentions steampunk and cyberpunk three times each — in a list of the
Oracle's *tastes*, in a list of cultural references, and in a sentence saying
Numinia's essence is steampunk and cyberpunk. **It never doses them, never names
a register, and has no section on creative direction at all.**

Its design-related sections are `Visual Identity`, `Color Palette` and
`Typography`, totalling under 300 words.

## 3. The one place they do agree

`CAN-002` fixes six hex values. **All six appear in `STD-008`, with the same
roles, and none is listed among the colours the system rejects.**

So this is not a contradiction between canon and standard. It is a **provenance
claim that cannot be honoured**: the standard credits decisions to a document
that never made them, and instructs the reader to change them in a place where
they do not exist.

## 4. Why it matters more than it looks

The mark is not decoration. It is the mechanism by which the design system
declares **what is not its to decide**. Forty-two times it says *this came from
above and is not mine to change*, and forty-two times the reader who follows the
instruction finds nothing.

The effect is the opposite of what the mark intends: material that presents
itself as inherited is in fact **originated here and unowned**.

## 5. What this does not claim

It does not claim the decisions are wrong, or that they belong in `CAN-002`.
The registers, the dosage and the surface map may well be the design system's
own — in which case the mark is simply false and should say `[EXTENSION]`.

**Deciding which is an Oracle's call**, because it determines whether changing
the 40/40/20 mix requires touching a `sealed` canon or a `governed` standard.

## 6. Closure condition

> **Closes when:** every `[CANON]` mark in `STD-008` either names a section that
> exists in `CAN-002` or a decision record that exists in `decisions/`, or is
> corrected to `[EXTENSION]`.

## 7. Reproduce

```bash
cd repos/numinia-nwos && git rev-parse --short HEAD   # 667cb93
grep -c '\[CANON' standards/STD-008-design-system.md  # 42
for t in Umbral Velo low-poly Solarpunk; do
  printf '%-12s STD-008=%s CAN-002=%s\n' "$t" \
    "$(grep -o "$t" standards/STD-008-design-system.md | wc -l)" \
    "$(grep -o "$t" canon/CAN-002-brand-and-culture.md | wc -l)"
done
```

Output at `667cb93`:

```
Umbral       STD-008=23 CAN-002=0
Velo         STD-008=42 CAN-002=0
low-poly     STD-008=5 CAN-002=0
Solarpunk    STD-008=2 CAN-002=0
```
