const http = require('http');

// ==========================================
// SERVER MEMORY
// ==========================================
let tasks = ["Finish web homework", "Drink water"];

// ==========================================
// 1. THE INTERFACE SIDE (HTML, CSS & JavaScript)
// ==========================================
const HTML_PAGE = `
<!DOCTYPE html>
<html>
<head>
    <title>Mini To-Do List</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f9f9f9; }
        input { padding: 10px; font-size: 16px; width: 250px; }
        .add-btn { padding: 10px 20px; font-size: 16px; cursor: pointer; background: #28a745; color: white; border: none; border-radius: 4px; }
        .delete-btn { padding: 5px 10px; font-size: 14px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 4px; float: right; }
        ul { list-style: none; padding: 0; margin-top: 20px; }
        li { background: white; margin: 8px auto; padding: 12px; width: 350px; border-radius: 4px; text-align: left; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .empty-message { color: #6c757d; font-style: italic; text-align: center; background: transparent; box-shadow: none; font-size: 18px; margin-top: 30px;}
    </style>
</head>
<body>
    <h1>My To-Do List</h1>
    <input type="text" id="taskInput" placeholder="New task...">
    <button class="add-btn" onclick="addTask()">Add Task</button>
    <ul id="taskList"></ul>

    <script>
        window.onload = loadTasks;

        function loadTasks() {
            fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    const list = document.getElementById('taskList');
                    list.innerHTML = ""; 
                    
                    if (data.tasks.length === 0) {
                        list.innerHTML = "<li class='empty-message'>Everything is done! Awesome job! </li>";
                        return;
                    }

                    data.tasks.forEach((task, index) => {
                        let li = document.createElement('li');
                        li.innerText = task;
                        
                        let deleteBtn = document.createElement('button');
                        deleteBtn.innerText = "Done";
                        deleteBtn.className = "delete-btn";
                        deleteBtn.onclick = () => deleteTask(index);
                        
                        li.appendChild(deleteBtn);
                        list.appendChild(li);
                    });
                });
        }

        function addTask() {
            const input = document.getElementById('taskInput');
            if (input.value.trim() === "") return; 

            fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: input.value }) 
            }).then(() => {
                input.value = ""; 
                loadTasks(); 
            });
        }

        function deleteTask(taskIndex) {
            fetch('/api/tasks', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index: taskIndex })
            }).then(() => {
                loadTasks(); 
            });
        }
    </script>
</body>
</html>
`;

// ==========================================
// 2. THE SERVER SIDE (Backend Logic)
// ==========================================
const server = http.createServer((req, res) => {
    
    // GET: Serve the HTML page
    if (req.method === 'GET' && req.url === '/') {
        console.log("💻 Browser requested the HTML page.");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML_PAGE);
    } 
    
    // GET: Send tasks to the interface
    else if (req.method === 'GET' && req.url === '/api/tasks') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ tasks: tasks }));
    } 
    
    // POST: Receive a new task from the interface
    else if (req.method === 'POST' && req.url === '/api/tasks') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); }); // Read the incoming data
        
        req.on('end', () => {
            const data = JSON.parse(body);
            if (data.task) {
                tasks.push(data.task);
                console.log(`➡️ SERVER RECEIVED NEW TASK: ${data.task}`);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok' }));
        });
    } 
    
    // DELETE: Remove a task based on its index
    else if (req.method === 'DELETE' && req.url === '/api/tasks') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        
        req.on('end', () => {
            const data = JSON.parse(body);
            // Check if the index is valid, then remove it from the array
            if (data.index !== undefined && data.index >= 0 && data.index < tasks.length) {
                const deletedItem = tasks.splice(data.index, 1)[0];
                console.log(`❌ SERVER DELETED TASK: ${deletedItem}`);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'deleted' }));
        });
    } 
    
    // 404: Route not found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 9000
const PORT = 9000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
    console.log("\n==================================================");
    console.log("🚀 NEW NODE.JS SERVER RUNNING!");
    console.log(`1. Open your browser.`);
    console.log(`2. Go EXACTLY to this URL: http://${HOST}:${PORT}`);
    console.log("3. Watch this terminal to see button clicks happen.");
    console.log("==================================================\n");
});