# Insert or replace a drawn sheet's entry at the top of src/curriculum/practice/art.js:
#   python3 scripts/practice-art/register.py animals
import os, re, subprocess, sys
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
for name in sys.argv[1:]:
    entry = subprocess.run(['node', 'scripts/practice-art/art-entry.mjs', name], capture_output=True, text=True, cwd=root, check=True).stdout
    path = root + '/src/curriculum/practice/art.js'
    s = open(path).read()
    pattern = re.compile(r"  \{ file: '" + re.escape(name) + r"\.svg'.*?\n  \] \},\n", re.S)
    s = pattern.sub(lambda m: entry, s) if pattern.search(s) else s.replace('const sheets = [\n', 'const sheets = [\n' + entry, 1)
    open(path, 'w').write(s)
    print('registered', name)
