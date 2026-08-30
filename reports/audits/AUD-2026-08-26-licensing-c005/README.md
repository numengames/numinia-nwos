---
title: "Annexes — AUD-2026-08-26 · Licensing audit of `numinia-nwos`"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-26T11:58:52+02:00"
created_source: "git:e4918fa"
created_confidence: exact
updated: "2026-08-26T11:58:52+02:00"
author: "pablofm"
owner: "oracle"
tags: [reports]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "not part of a numbered series; header added from git history, nothing invented"
---

# Annexes — AUD-2026-08-26 · Licensing audit of `numinia-nwos`

Evidence for `../AUD-2026-08-26-licensing-c005.md`. Captured **2026-08-26**
against repository state `8a529fa`, with `reuse 6.2.0`.

These files were produced in `/tmp` during the audit and are committed here so
the evidence survives. `/tmp` does not.

| File | What it is | Reproduce with |
|---|---|---|
| `reuse-lint.txt` | Literal `reuse lint` output at `8a529fa` — exit 1, two invalid SPDX expressions, one file without licensing information | `reuse lint` |
| `sbom.spdx` | Full SPDX SBOM, 510 files, 194 001 B. The resolved regime **per file**, with REUSE precedence applied | `reuse spdx` |
| `cc0-irrevocable.json` | The 31 files reserved today that were already published under root CC0 between `9f51ad1` and `2efd546` | `scripts/…` — see report §F1 |
| `robots/*.txt` | `robots.txt` of seven hosts, verbatim | `curl -sSL https://<host>/robots.txt` |

## Why the `robots/` capture matters most

The Oracle is expected to switch off the Cloudflare managed block. **Once that
happens this capture is the only record of the prior state that will exist.**

State recorded here, 2026-08-26:

- Six of seven hosts served `Content-Signal: search=yes,ai-train=no,use=reference`
  inside a `# BEGIN Cloudflare Managed content` block.
- Nine AI user-agents under `Disallow: /` on each: `Amazonbot`,
  `Applebot-Extended`, `Bytespider`, `CCBot`, `ClaudeBot`,
  `CloudflareBrowserRenderingCrawler`, `Google-Extended`, `GPTBot`,
  `meta-externalagent`.
- `numengames.com.txt` is **0 bytes on purpose**: that host returned HTTP 404 for
  `/robots.txt` and is served by `awselb/2.0`, not Cloudflare. An empty file is
  the finding, not a failed download.

`Content-Signal` restrictions are express reservations of rights under Article 4
of EU Directive 2019/790. What the signal *says*, what the regime *is*, and what
it *blocks in practice* are three separate effects — see report §G5.

## Caveat on the instrument

`reuse 6.2.0` was installed for this audit and is **not pinned** in the
repository. A future run with a different version may produce different output.
Recorded as debt.
