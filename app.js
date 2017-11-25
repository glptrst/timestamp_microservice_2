"use strict";
const http = require('http');

const port = process.env.PORT || 3000;

// create a Server object
const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
    } else {
	// res.statusCode = 403;
    }
});


server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
