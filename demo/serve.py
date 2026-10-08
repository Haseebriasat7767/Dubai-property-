import http.server
import socketserver
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve the demo both at /demo and at / (rewriting relative asset paths).
        if self.path in ('/', '/index.html'):
            self.path = '/demo/index.html'
        elif self.path.startswith('/vendor/'):
            self.path = '/demo' + self.path
        return super().do_GET()

    def log_message(self, fmt, *args):
        pass

socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(('0.0.0.0', 8080), Handler) as httpd:
    print('VÉLORA preview on :8080')
    httpd.serve_forever()
