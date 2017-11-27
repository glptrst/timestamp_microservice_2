"use strict";
const http = require('http');
const timestamp = require('./timestamp.js');

const port = process.env.PORT || 3000;

// create a Server object
const server = http.createServer((req, res) => {
    //Add error listener
    req.on('error', (err) => {
	console.error(err);
	res.statusCode = 400;
	res.end();
    });

    // Accept only GET method
    if (req.method === 'GET') {
	if (req.url === '/') {
	    res.statusCode = 200;
	    res.setHeader('Content-Type', 'text/plain');
	    res.end('Hello World\n');
	} else {
	    var splittedUrl = req.url.split('/');
	    //allow only url with format '/param'
	    if (splittedUrl.length <= 2 || (splittedUrl.length === 3 && splittedUrl[2] === '')) {
		if (Number.isInteger(Number(splittedUrl[1]))) { // if param is an integer (a unix param)
		    // set header
		    res.statusCode = 200;
		    res.setHeader('Content-Type', 'application/json');
		    // make response body
		    let response = timestamp.makeTimestampObj(splittedUrl[1], 'unix');
		    // send response
		    res.end(JSON.stringify(response));
		} else { // if param is not an integer
		    // set headers
		    res.statusCode = 200;
		    res.setHeader('Content-Type', 'application/json');

		    let param = decodeURI(splittedUrl[1]);

		    let response = timestamp.makeTimestampObj(param, 'natural');
		    res.end(JSON.stringify(response));
		}
	    } else {
		res.statusCode = 404;
		res.end();
	    }
	}
    } else {
	res.statusCode = 404;
	res.end();
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
