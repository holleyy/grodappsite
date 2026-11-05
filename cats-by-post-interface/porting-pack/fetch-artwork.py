#!/usr/bin/env python3
"""Add the companion artwork to this extracted guide, verifying every file."""
from pathlib import Path, PurePosixPath
from urllib.request import urlopen
import argparse, hashlib, io, json, zipfile

def digest(data):return hashlib.sha256(data).hexdigest()
def fetch(base,destination):
 root=Path(destination).resolve();manifest=json.loads((root/'file-manifest.json').read_text());expected={f['path']:f for f in manifest['files']}
 with urlopen(base.rstrip('/')+'/download-index.json',timeout=60) as response:index=json.load(response)
 count=0
 for part in index['archives']:
  if part['role']=='guide':continue
  with urlopen(base.rstrip('/')+'/'+part['file'],timeout=90) as response:data=response.read()
  if len(data)!=part['bytes'] or digest(data)!=part['sha256']:raise ValueError('Archive checksum mismatch: '+part['file'])
  with zipfile.ZipFile(io.BytesIO(data)) as archive:
   for item in archive.infolist():
    if item.is_dir():continue
    p=PurePosixPath(item.filename)
    if p.is_absolute() or '..' in p.parts or item.filename not in expected:raise ValueError('Unexpected archive path: '+item.filename)
    contents=archive.read(item);record=expected[item.filename];target=(root/item.filename).resolve()
    if not target.is_relative_to(root) or len(contents)!=record['bytes'] or digest(contents)!=record['sha256']:raise ValueError('File verification failed: '+item.filename)
    if target.exists():
     if digest(target.read_bytes())!=record['sha256']:raise FileExistsError('Keeping your modified file: '+str(target))
    else:target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(contents)
    count+=1
  print('Verified '+part['file'],flush=True)
 return count

if __name__=='__main__':
 parser=argparse.ArgumentParser(description='Fetch verified companion artwork; existing modified files are preserved.')
 parser.add_argument('--base-url',default='https://holleyy.github.io/grodappsite/cats-by-post-interface/porting-pack')
 parser.add_argument('--destination',type=Path,default=Path(__file__).resolve().parent)
 args=parser.parse_args()
 try:print(f'Artwork ready: {fetch(args.base_url,args.destination)} verified files.')
 except Exception as error:parser.exit(1,str(error)+'\nRun again after resolving this issue; already verified files are kept.\n')
