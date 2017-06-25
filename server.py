import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.nq': 'application/n-quads',
    '.n3': 'text/n3',
    '.ttl': 'text/turtle',
});

httpd = socketserver.TCPServer(("", PORT), Handler)

print("Serving at port", PORT)
httpd.serve_forever()