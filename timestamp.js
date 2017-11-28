module.exports = {
    makeTimestampObj: (value, type) => {
	if (type === 'unix') {
	    if (!(Number.isInteger(Number(value)))) // if value is not an integer
		return {unix: null, natural: null};
	    // get natural language date
	    // helpful: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
	    var date = new Date(Number(value)*1000);
	    var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
	    var natLangDate = date.toLocaleDateString('en-US', options);
	    if (natLangDate === 'Invalid Date') {
		return { unix: null, natural: null };
	    } else {
		return { unix: value, natural: natLangDate };
	    }
	} else if (type === 'natural') {
	    // check if it is a date in a correct format
	    //the parameter splitted with ' ' should give an arrary of length three
	    var splitted = value.split(' ');
	    if (splitted.length !== 3) {
		console.log('splitted.length !== 3');
		return {unix: null, natural: null};
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
				var unixTimestamp = Date.parse(String(month + ' ' + day + ', ' + year + ' UTC'))/1000;
				if (isNaN(unixTimestamp)) { // if Date.parse returns a NaN, then there is still something wrong in the string given as a input
				    console.log('isNaNTimestamp');
				    return {unix: null, natural: null};
				} else {
				    return {unix: unixTimestamp, natural: value};
				}
			    } else {
				console.log("! Number.isInteger(Number(splitted[2]))");
				return {unix: null, natural: null};
			    }
			} else {
			    console.log("! shouldBeAcomma === ','");
			    return {unix: null, natural: null};
			}
		    } else {
			console.log('! Number.isInteger(Number(shouldBeAnum))');
			return {unix: null, natural: null};
		    }
		} else {
		    console.log("! (typeof splitted[0] === 'string')");
		    return {unix: null, natural: null};
		}
	    }
	} else {
	    return null; 
	}
    }
};
