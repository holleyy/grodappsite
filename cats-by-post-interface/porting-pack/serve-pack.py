#!/usr/bin/env python3
"""Read the extracted pack locally; no internet connection or install required."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

if __name__ == '__main__':
 parser=argparse.ArgumentParser(description='Serve this extracted reference pack on loopback only.')
 parser.add_argument('--port',type=int,default=8769)
 args=parser.parse_args()
 handler=partial(SimpleHTTPRequestHandler,directory=str(Path(__file__).resolve().parent))
 server=ThreadingHTTPServer(('127.0.0.1',args.port),handler)
 print(f'Open http://127.0.0.1:{args.port}/ in your browser. Press Ctrl-C to stop.',flush=True)
 try:server.serve_forever()
 except KeyboardInterrupt:pass
 finally:server.server_close()
