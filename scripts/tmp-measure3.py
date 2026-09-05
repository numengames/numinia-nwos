#!/usr/bin/env python3
"""Mide la iteracion en tokens cl100k_base, el metodo del ledger de MIS-0127."""
import subprocess, sys, tiktoken
R = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"
enc = tiktoken.get_encoding("cl100k_base")

def tracked(ref):
    out = subprocess.run(["git", "-C", R, "ls-tree", "-r", "--name-only", ref],
                         capture_output=True, text=True).stdout.split()
    return [f for f in out if f.endswith(".md") and not f.startswith(".github")]

def blob(ref, path):
    r = subprocess.run(["git", "-C", R, "show", f"{ref}:{path}"],
                       capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else ""

base, head = "origin/main", "HEAD"
fb, fh = set(tracked(base)), set(tracked(head))
tb = sum(len(enc.encode(blob(base, f))) for f in fb)
th = sum(len(enc.encode(blob(head, f))) for f in fh)
print(f"base  {len(fb):>4} ficheros  {tb:>8,} tokens")
print(f"head  {len(fh):>4} ficheros  {th:>8,} tokens")
print(f"neto  {len(fh)-len(fb):>+4} ficheros  {th-tb:>+8,} tokens")
print(f"\nborrados: {sorted(fb-fh)}")
print(f"nuevos  : {sorted(fh-fb)}")
print("\n--- por fichero cambiado ---")
rows = []
for f in sorted(fb | fh):
    a = len(enc.encode(blob(base, f))) if f in fb else 0
    b = len(enc.encode(blob(head, f))) if f in fh else 0
    if a != b:
        rows.append((b - a, f, a, b))
for d, f, a, b in sorted(rows):
    print(f"  {d:>+7,}  {f}  ({a:,} -> {b:,})")
