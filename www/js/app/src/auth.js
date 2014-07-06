/**
 * This file contains files related to authentification management.
 * Global Events:
 *  auth.login
 *	auth.register
 *  auth.logout
 *	auth.sessionChange
 */

 define(['app/monlift', 'app/event'], function(monlift, EventProvider){
	 
	 ML = monlift.getInstance();
	 
	 return {
 		/*
 		 * Function to login to the server, return a token
 		 *
 		 */
 		login: function(email, password, cb)
 		{
 			if(email && password)
 			{
	 		 	var endpoint = 'oauth/login';
	 		 	var jsonRequest = {"email":email, "password":password};
	 		 	ML.post(endpoint, jsonRequest, function(response, status){
					
	 		 		if(status == "ok")
	 		 		{
	 		 			ML.log(response);
 						
 						ML.setSession(response);

	 		 		}
	 		 		else
	 		 		{
	 		 			ML.log(response);
	 		 		}

	 		 		if(cb)
	 		 		    cb(response);
	 		 	});

 		 	}

 		},

 		/*
 		 * Function to register a new user
 		 *
 		 */ 
		 
 		register:function(firstname, lastname, email, password, phone){
 			if(firstname && lastname && password && email && phone)
 			{
 				var endpoint = "oauth/register";
 				var jsonRequest = {
 					"firstname":firstname,
 					"lastname":lastname,
 					"password":password,
 					"email":email,
 					"phone":phone
 				}

 				ML.post(endpoint, jsonRequest, function(response, status){
					
 					if(status == "ok")
 					{
 						ML.setSession(response);
						EventProvider.fire('auth.login');
						

 					}
 					else
 					{
 						ML.log(response);
						EventProvider.fire('auth.registerFailed', response);
 					}
 					
					
 				})


 			}
 		},
		
 		/*
 		 * Function to get the login status of the user
 		 * @return boolean
 		 *
 		 */
 		 isUserLoggedIn : function()
 		 {
			 return ML.isUserLoggedIn();
		 },
		 
	 }
 	
 })