var firebase = require('firebase');


firebase.authWithCustomToken(token, function(error, authData) {
	if (error) {
		isLoggedIn = false;
		console.log("Login Failed!", error);
		return isLoggedIn;
		} else {
			isLoggedIn = true;
			console.log("Login Succeeded!", authData);
			return isLoggedIn;
		}
});
