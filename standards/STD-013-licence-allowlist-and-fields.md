---
id: "STD-013"
uid: ""
title: "Licence allowlist and fields"
type: documentation
subtype: register
status: draft
version: "1.0.0"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-09T01:45:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, SPDX, register, allowlist]
threshold: governed
series_change: "1.0.0 — new register, split from STD-010 under ADR-043: the allowlist (old §3), the in-file metadata fields (old §5) and the licence texts (old §10). Rows unchanged."
---

# Licence allowlist and fields

> **Summary:** Three tables `STD-010` points at: which licences an input may
> carry (`LIC-005`), which field carries the licence inside each media format
> (`LIC-009`), and where each licence text lives.

## Allowlist

| Tier | Licences | Condition |
|---|---|---|
| Freely | `MIT` `ISC` `BSD-2-Clause` `BSD-3-Clause` `Apache-2.0` `0BSD` `CC0-1.0` `CC-BY-4.0` · `OFL-1.1` | OFL for fonts only |
| With isolation | `MPL-2.0` `EPL-2.0` `LGPL-3.0` | file-level boundary kept |
| With a signed decision | `GPL-3.0` `AGPL-3.0` | isolated and declared; separate repository if a third party's |
| Never | `BUSL` `SSPL` `Elastic` · Commons Clause · proprietary · `CC-BY-NC-*` `CC-BY-ND-*` · any package without a `license` field | the *never* tier applies to what is distributed or served (`LIC-006`) |

Direction of pull: `MIT / BSD / ISC → Apache-2.0 → GPL-3.0 → AGPL-3.0`, never
the other way.

## Fields inside the file

| Format | Field |
|---|---|
| glTF / GLB | `asset.copyright` |
| VRM | `VRMC_vrm.meta` — `licenseUrl`, `otherLicenseUrl`, permissions; for CC0: `otherLicenseUrl` to CC0, `avatarPermission: everyone`, `commercialUsage: corporation`, `creditNotation: unnecessary`, `allowRedistribution: true`, `modification: allowModificationRedistribution` |
| MP3 | ID3v2 `TCOP` + `TXXX:LICENSE` |
| WAV / FLAC / OGG | Vorbis comments `LICENSE`, `COPYRIGHT` |
| JPEG / PNG / WebP | XMP `xmpRights:WebStatement` + `cc:license`; EXIF `Copyright` |
| MP4 / MOV | embedded XMP |
| SVG | RDF with `dc:rights` and `cc:license` |
| source file | `// SPDX-FileCopyrightText: 2026 Numen Games S.L.` · `// SPDX-License-Identifier: MIT` |
| directory | `REUSE.toml` annotation: `path`, `SPDX-FileCopyrightText`, `SPDX-License-Identifier` |

## Texts

| Licence | SPDX | Official text |
|---|---|---|
| CC0 1.0 Universal | `CC0-1.0` | <https://creativecommons.org/publicdomain/zero/1.0/legalcode.en> |
| CC Attribution 4.0 | `CC-BY-4.0` | <https://creativecommons.org/licenses/by/4.0/> |
| MIT | `MIT` | <https://spdx.org/licenses/MIT.html> |
| Apache License 2.0 | `Apache-2.0` | <https://www.apache.org/licenses/LICENSE-2.0> |
| Mozilla Public License 2.0 | `MPL-2.0` | <https://www.mozilla.org/MPL/2.0/> |
| GNU GPL v3 | `GPL-3.0-only` | <https://www.gnu.org/licenses/gpl-3.0.html> |
| GNU AGPL v3 | `AGPL-3.0-only` | <https://www.gnu.org/licenses/agpl-3.0.html> |
| SIL Open Font License 1.1 | `OFL-1.1` | <https://openfontlicense.org/open-font-license-official-text/> |
| Free Cultural Works | — | <https://freedomdefined.org/Definition/Es> |
| Identifiers | SPDX | <https://spdx.org/licenses/> |
| Declaration | REUSE 3.3 | <https://reuse.software/spec-3.3/> |
| VRM 1.0 · meta | — | <https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/meta.md> |
