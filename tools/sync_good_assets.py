from pathlib import Path
import json
import subprocess

repo = Path(__file__).resolve().parents[1]
assets_js = repo / 'scripts' / 'hf-good-assets.js'
html = repo / 'Helvetic_Freight_v1.1.38_CleanApp.html'

node_code = f"global.window=global; require({json.dumps(str(assets_js))}); console.log(JSON.stringify(window.HF_ASSETS));"
assets = subprocess.check_output(['node', '-e', node_code], text=True)
inline = 'const ASSETS = ' + json.dumps(json.loads(assets), separators=(',', ':')) + ';'

text = html.read_text()
start = text.index('const ASSETS = ')
end = text.index(';', start) + 1
html.write_text(text[:start] + inline + text[end:])
print(f'Synced {assets_js.relative_to(repo)} into {html.relative_to(repo)}')
