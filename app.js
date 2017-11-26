"use strict";
const http = require('http');

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
		if (Number.isInteger(Number(splittedUrl[1]))) { // if param is an integer
		    // set header
		    res.statusCode = 200;
		    res.setHeader('Content-Type', 'application/json');
		    // get natural language date
		    // helpful: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
		    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
		    var date = new Date(Number(splittedUrl[1])*1000);
		    var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
		    var natLangDate = date.toLocaleDateString('en-US', options);
		    if (natLangDate === 'Invalid Date') {
			res.end(JSON.stringify((
			    {
				unix: null,
				natural: null
			    }
			)));
		    } else {
	    		res.end(JSON.stringify((
			    {
				unix: splittedUrl[1],
				natural: date.toLocaleDateString('en-US', options)
			    }
			)));
		    }
		} else { // if param is not an integer
		    res.statusCode = 200;
		    res.setHeader('Content-Type', 'application/json');
		    res.write(JSON.stringify({
			unix: 'TODO',
			natural: splittedUrl[1]
		    }));
		    res.end();
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
