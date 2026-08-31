#!/usr/bin/env python3
"""MIS-127 — token delta for the decisions/ consolidation.

Same method as the rest of the MIS-127 ledger: cl100k_base, whole files.
BEFORE reads the committed tree (HEAD); AFTER reads the working tree from
disk — an earlier version of this script read AFTER via `git show :path`
and silently reported 0 tokens for every file, which would have put a
fabricated number in the ledger.
"""
import subprocess
import sys
from pathlib import Path

try:
    import tiktoken
except ImportError:
    sys.exit("tiktoken not available")

enc = tiktoken.get_encoding("cl100k_base")


def git(*args):
    return subprocess.run(
        ["git", *args], capture_output=True, text=True, check=True
    ).stdout


def head_tokens(paths):
    total = 0
    for p in paths:
        total += len(enc.encode(git("show", f"HEAD:{p}")))
    return total


def disk_tokens(paths):
    total = 0
    for p in paths:
        total += len(enc.encode(Path(p).read_text(encoding="utf8")))
    return total


old = git("ls-tree", "--name-only", "HEAD", "decisions/").split()
new = sorted(str(p) for p in Path("decisions").glob("*.md"))

o, n = head_tokens(old), disk_tokens(new)
print(f"decisions/ BEFORE : {len(old):2d} files, {o:6d} tokens")
print(f"decisions/ AFTER  : {len(new):2d} files, {n:6d} tokens")
print(f"DELTA (folder)    : {n - o:+d} tokens, {len(new) - len(old):+d} files")

# Whole-repo delta: the citation rewrite touched files outside decisions/.
# EXCLUDE decisions/ — it is already measured above, and counting the
# deleted records here again double-counts them as a further -20K "saving"
# in files that were never touched by the rewrite.
tracked = set(git("ls-tree", "--name-only", "-r", "HEAD").split())
changed = [
    f
    for f in git("diff", "--name-only", "HEAD", "--", "*.md").split()
    if f and not f.startswith("decisions/")
]
before = head_tokens([f for f in changed if f in tracked])
after = disk_tokens([f for f in changed if Path(f).exists()])
print(f"\ncitation rewrite  : {len(changed)} files, {after - before:+d} tokens")
print(f"NET (repo, .md)   : {(n - o) + (after - before):+d} tokens")
