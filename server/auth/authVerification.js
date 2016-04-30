var jwt = require('jwt-simple');

var verifyToken = function (request, response, next) {
	var secret = "society";
	
	var token = (request.body && request.body.access_token) || 
							(request.query && request.query.access_token) || 
		           request.headers['x-access-token'];
		           
	if (token) {
		console.log('has token');
    var decodedToken = jwt.decode(token, secret);
    var id = decodedToken.id;
    request.id = id;
    next();
	} else {
		response.status(401).send("Not authorized.");
	}
};

module.exports('verifyToken')