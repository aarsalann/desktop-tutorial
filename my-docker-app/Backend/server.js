const http = require('http');

let tasks = [{ id: 1, text: "Finish web homework" }];

const server = http.createServer((req, res) => {
    // Allow the frontend to connect (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/tasks') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ tasks: tasks }));
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data.task) tasks.push({ id: Date.now(), text: data.task });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'ok' }));
            });
        } else if (req.method === 'DELETE') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const data = JSON.parse(body);
                tasks = tasks.filter(t => t.id !== data.id);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'deleted' }));
            });
        }
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(9000, '0.0.0.0', () => console.log("Backend API running on port 9000"));