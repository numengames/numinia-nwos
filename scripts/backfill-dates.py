#!/usr/bin/env python3
"""
Backfill created/updated from git, per S-001 §8.

Rules the standard imposes (§8, "Rule for the backfill"):
  - report which commit each date comes from  -> created_source: "git:<sha>"
  - mark inferred ones                        -> created_confidence: exact|inferred
  - never invent a date to fill the field     -> no trail = file untouched

exact    : `git log --diff-filter=A` and `git log --follow --diff-filter=A`
           agree on the addition commit, so no rename crossed the trail.
inferred : they disagree — --follow crossed the MIS-066 bulk rename and the
           date is the best available approximation, declared as such.

Only files whose `created` or `updated` carries T00:00:00Z are touched, and
only those two fields plus the two provenance fields are written. Idempotent:
a second run reports 0 changes. --apply writes; without it, dry run.
"""
import os, re, sys, json, subprocess, collections

REPO = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"
APPLY = "--apply" in sys.argv
os.chdir(REPO)

def sh(*a):
    return subprocess.run(a, capture_output=True, text=True).stdout.strip()

def to_utc(iso):
    """Normalise any git ISO to the Z form the standard uses."""
    m = re.match(r'(\d{4}-\d\d-\d\d)T(\d\d:\d\d:\d\d)(Z|[+-]\d\d:\d\d)', iso)
    if not m: return None
    date, time, off = m.groups()
    if off == "Z": return f"{date}T{time}Z"
    import datetime as dt
    d = dt.datetime.fromisoformat(f"{date}T{time}{off}")
    return d.astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def needs_fix(v):
    """Two shapes of the same lie, both flagged by H-06/H-07:
       T00:00:00Z  — the midnight nobody wrote at
       YYYY-MM-DD  — a bare date, no time at all
       A placeholder is neither: it is left to the template rule above."""
    if not v: return False
    v = v.strip()
    if v.startswith("{"): return False
    return v.endswith("T00:00:00Z") or bool(re.fullmatch(r'\d{4}-\d\d-\d\d', v))

# --- the files the guard flags for H-06/H-07, straight from the baseline ---
base = json.load(open("scripts/frontmatter-baseline.json"))
ent = [v for v in base.values() if isinstance(v, list) and v and isinstance(v[0], str)][0]
targets = sorted({m.group(2) for m in
                  (re.match(r'\s*(H-0[67])\s+(\S+)\s+::', e) for e in ent) if m})

changed, skipped, untouched = [], [], []

for f in targets:
    if not os.path.exists(f):
        skipped.append((f, "file gone")); continue
    # Templates keep their placeholders: {YYYY-MM-DD} is the instruction to the
    # next author, not a date to be backfilled. Giving _template/ a real date
    # would teach every document copied from it to carry a lie.
    if "_template/" in f or "/TEMPLATE" in f.upper():
        skipped.append((f, "template — placeholder is deliberate")); continue
    text = open(f, encoding="utf8").read()
    if not text.startswith("---"):
        skipped.append((f, "no frontmatter")); continue
    parts = text.split("---", 2)
    if len(parts) < 3:
        skipped.append((f, "malformed frontmatter")); continue
    fm, body = parts[1], parts[2]

    plain = sh("git","log","--diff-filter=A","--format=%aI|%h","--",f).splitlines()
    foll  = sh("git","log","--follow","--diff-filter=A","--format=%aI|%h","--",f).splitlines()
    best  = (foll or plain)
    if not best:
        skipped.append((f, "no git trail — left alone per §8")); continue
    iso, sha = best[-1].split("|")
    real = to_utc(iso)
    if not real:
        skipped.append((f, f"unparseable git date {iso}")); continue

    confidence = ("exact" if plain and foll
                  and plain[-1].split("|")[1] == foll[-1].split("|")[1]
                  else "inferred")

    new_fm, edits = fm, []

    # created: only replace the midnight form
    m = re.search(r'^created:\s*"?([^"\n]+)"?\s*$', new_fm, re.M)
    if m and needs_fix(m.group(1)):
        new_fm = re.sub(r'^created:.*$', f'created: "{real}"', new_fm, count=1, flags=re.M)
        edits.append(f'created {m.group(1).strip()} -> {real}')

    # updated: midnight, or older than created once created is real.
    # LIMITATION, stated rather than hidden: this takes the file's most recent
    # commit, which is the last time the FILE changed, not necessarily the last
    # time its MEANING changed — a lint sweep counts. It is verifiable and it
    # is never earlier than the truth, which is the best git can offer.
    # updated: midnight, a bare date, or — once created becomes real — a value
    # that now sits BEFORE it. The third case is created by this very script:
    # backfilling created to a precise time can strand an updated that was
    # merely coarse, and H-07 rejects updated < created.
    m = re.search(r'^updated:\s*"?([^"\n]+)"?\s*$', new_fm, re.M)
    cur_created = re.search(r'^created:\s*"?([^"\n]+)"?\s*$', new_fm, re.M)
    stranded = bool(m and cur_created and not m.group(1).strip().startswith("{")
                    and m.group(1).strip() < cur_created.group(1).strip())
    if m and (needs_fix(m.group(1)) or stranded):
        head = sh("git","log","-1","--format=%aI|%h","--",f)
        u_iso, u_sha = (head.split("|") if head else (iso, sha))
        u_real = to_utc(u_iso) or real
        if u_real < real: u_real = real
        new_fm = re.sub(r'^updated:.*$', f'updated: "{u_real}"', new_fm, count=1, flags=re.M)
        edits.append(f'updated {m.group(1).strip()} -> {u_real}')

    if not edits:
        untouched.append(f); continue

    # provenance — added only when created was rewritten, never overwritten
    if 'created ' in ' '.join(edits):
        if not re.search(r'^created_source:', new_fm, re.M):
            new_fm = re.sub(r'^(created:.*)$', rf'\1\ncreated_source: "git:{sha}"',
                            new_fm, count=1, flags=re.M)
        if not re.search(r'^created_confidence:', new_fm, re.M):
            new_fm = re.sub(r'^(created_source:.*)$', rf'\1\ncreated_confidence: {confidence}',
                            new_fm, count=1, flags=re.M)

    changed.append((f, confidence, sha, edits))
    if APPLY:
        open(f, "w", encoding="utf8").write("---" + new_fm + "---" + body)

print("=== BACKFILL created/updated FROM GIT (S-001 §8) ===")
print("mode:", "APPLY" if APPLY else "DRY RUN")
print()
print("  files flagged H-06/H-07 :", len(targets))
print("  would change            :", len(changed))
print("     exact                :", sum(1 for c in changed if c[1] == "exact"))
print("     inferred             :", sum(1 for c in changed if c[1] == "inferred"))
print("  already correct         :", len(untouched))
print("  skipped (untouched)     :", len(skipped))
for f, why in skipped[:10]:
    print("       -", f, "::", why)
print()
print("=== sample of 8 ===")
for f, conf, sha, edits in changed[:8]:
    print(f"  {f}  [{conf}, git:{sha}]")
    for e in edits: print("       ", e)
