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

		    // check if it is a date in a correct format
		    //the parameter splitted with ' ' should give an arrary of length three
		    var splitted = param.split(' ');
		    if (splitted.length !== 3) {
			res.end(JSON.stringify(
			    {
				unix: null,
				natural: null
			    }
			));
		    } else {
			// splitted[0] should be a string (it should be a month)
			if (typeof splitted[0] === 'string') {
			    // splitted[1] should be a number and a comma
			    var shouldBeAnum = splitted[1].substring(0, splitted[1].length - 1);
			    if (Number.isInteger(Number(shouldBeAnum))) {
				var shouldBeAcomma = splitted[1].charAt(splitted[1].length - 1);
				if (shouldBeAcomma === ',') {
				    // splitted[2] should be a number
				    if (Number.isInteger(Number(splitted[2]))) {
					var month = splitted[0].substring(0, 3);
					var day = splitted[1].substring(0, splitted[1].length - 1);
					var year = splitted[2];
					var unixTimestamp = Date.parse(String(month + ' ' + day + ', ' + year + ' UTC'));
					if (isNaN(unixTimestamp)) { // if Date.parse returns a NaN, then there is still something wrong in the string given as a input
					    res.end(JSON.stringify(
						{
						    unix: null,
						    natural: null
						}
					    ));
					} else {
					    res.end(JSON.stringify(
				    		{
				    		    unix: unixTimestamp,
				    		    natural: param
				    		}
					    ));
					}
				    } else {
					res.end(JSON.stringify(
					    {
						unix: null,
						natural: null
					    }
					));
				    }
				} else {
				    res.end(JSON.stringify(
					{
					    unix: null,
					    natural: null
					}
				    ));
				}
			    } else {
				res.end(JSON.stringify(
				    {
					unix: null,
					natural: null
				    }
				));
			    }
			} else {
			    res.end(JSON.stringify(
				{
				    unix: null,
				    natural: null
				}
			    ));
			}
		    }
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
