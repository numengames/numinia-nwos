<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: MIT
-->
# `.github/rulesets/` — branch protection, written down

`protect-main.json` is a **manual export** of GitHub ruleset `21281544`,
the one that protects `main`. The panel is the source of truth; this file is
a snapshot so the setting can be read, diffed and reviewed. Nothing applies
it and nothing detects drift: a difference means the panel is right and this
file is stale.

Re-export before trusting it:

```bash
gh api repos/numengames/numinia-nwos/rulesets/21281544 > .github/rulesets/protect-main.json
```

One known, benign difference: the API omits `bypass_actors` when empty; the
export states `"bypass_actors": []` on purpose, because *nobody bypasses* is
the most important thing the file says.

Moved here from `infra/github/` by `ADR-045`: the folder held one file, and
the repository's own machinery already lives under `.github/`. Licence MIT
(`REUSE.toml`), as for any code that configures the repository.
