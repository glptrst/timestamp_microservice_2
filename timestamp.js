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
	    // TODO
	    return {unix: null, natural: null};
	} else {
	    return null; 
	}
    }
};
