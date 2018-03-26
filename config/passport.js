module.exports = function(passport) {

	var FacebookStrategy = require('passport-facebook').Strategy;
	var User = require('./models/user');
	var configAuth = require('./auth');
	var async = require('async');

	//serialize the user for this session
	//------------------check this first is getting user data isn't working------
	passport.serializeUser(function(user, done) {
		//console.log("serializing user: " + user.name);
		//console.log("printing id: " + user.id);
		//uncomment if you want to store the entire user info as part of session
		//done(null, user);
		done(null, user.id);
	});

	//deserialize the user
	passport.deserializeUser(function(id, done) {
		////console.log("deserializing user: " + id);
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//use facebook strategy
	passport.use(new FacebookStrategy(configAuth.facebookAuth,
		function(req, accessToken, refreshToken, profile, done) {
			//wait just a little bit before doing stuff
			process.nextTick(function() {
				//find the user and see if he's there
				User.findOne({'facebook_id' : profile.id}, function(err, user){
					//if the user is in the database
					if (user) {
						//console.log("Existing user signed in");
						//create the session for the user
						//console.log("user is in database");
						//console.log(JSON.stringify(profile, null, 3));
						user = updateUser(user, profile, accessToken);
						user.save(function(err) {
						  if (err) {
							 ////console.log(err);
							 throw err;
						  }
						  ////console.log("updated friends list upon login");
						});

						user.friends.forEach(function(fbId){
							User.findOne({'facebook_id' : fbId}, function(error, friend){
								if (friend){
									//console.log("\t\t" + fbId + "\t" + friend.name);
								}else{
									//console.log("\t\t" + fbId + "\tFriend isn't in database.");
								}
							});
						});

						return done(null, user);
					} else {
					    //otherwise throw the error
					    if (err) {
						  	console.log(err);
						  	return done(err);
					    }
					    //otherwise, we have a new user
					    console.log("creating a new user");
					    var newUser = createUser(profile, accessToken);
					    update_all_friends(profile);
					    //save the user
					    newUser.save(function(err) {
						    if (err) {
							    throw err;
						    }
						    ////console.log("created a new user!");
						    return done(null, newUser);
						});
				    }
				});
			});

		}
	));

	function update_all_friends(profile) {
		friendsIDs = getFriends(profile);
		async.each(friendsIDs,
			function(friend_ID, callback) {
				User.findOne({'facebook_id' : friend_ID}, function(error, user) {
					//HERE GARRETT
					if(user) {
						if (user.friends.indexOf(profile.id) == -1) {
							console.log("Updated " + user.id + " friends list");
							user.friends.push(profile.id);
						} else {
							console.log(profile.id + " already exists in " + user.id + " friends list");
						}
					}

					if (user) {
					user.save(function(err) {
						if (err) {
							console.log(err);
							throw err;
						}
					});
					}
				});
		}, function(error) {
			console.log("List of users having their friends list updated...");
			console.log(friendsIDs);
		});
	}

	//helper functions to scrape profile
	function getProfileLink(profile) {
	  return profile._json.picture.data.url;
	}

	//function to get the user's school, graduation date, and major
	function getSchool(profile) {
	  //get the education object from the profile
	  var schools = profile._json.education;
	  //create the education object
	  var education = {};
	  //check through all the schools
	  if (schools != null) {
		  for (var i = 0; i < schools.length; i++) {
			 //if we stumble upon the user's college
			 if (schools[i].type == "College") {
				//fill in the information, if its there
				education.school = schools[i].school.name;
				if (schools[i].year !== undefined) {
				  education.gradDate = schools[i].year.name;
				}
				if (schools[i].concentration !== undefined) {
				  education.major = schools[i].concentration[0].name;
				}
			 }
		  }
	  }
	  return education;
	}

	//function to get the user's friends
	function getFriends(profile) {
	  //gets the list of friends
	  var friends = profile._json.friends.data;
	  //creates the friends array
	  var friendsIDs = [];
	  //for each of the friends
	  for (var i = 0; i < friends.length; i++) {
		 //push their profile id, very helpful for querying facebook profile ids
		 friendsIDs.push(friends[i].id);
	  }
	  return friendsIDs;
	}

	function updateUser(user, profile, accessToken) {
		//console.log("Updating user...");
		user.picture = getProfileLink(profile);
		user.education = getSchool(profile);
		user.friends = getFriends(profile);
		user.email = profile._json.email;
		user.facebook_id = profile.id;
		user.name = profile.name.givenName + " " +
								profile.name.familyName;
		user.gender = profile._json.gender;
		user.token = accessToken;
		console.log("User updated!");
		return user;
	}

	function createUser(profile, accessToken) {
	  var newUser = new User();
	  //store profile picture url
	  newUser.picture = getProfileLink(profile);
	  //get educational information
	  newUser.education = getSchool(profile);
	  //get the users friends
	  newUser.friends = getFriends(profile);
	  //store other information
	  newUser.email = profile._json.email;
	  newUser.facebook_id = profile.id;
	  newUser.name = profile.name.givenName + " " +
		 				  profile.name.familyName;
	  newUser.gender = profile._json.gender;
	  //store accesstoken to use for graph api calls later
	  newUser.token = accessToken;
	  //return user
	  return newUser;
	}
};
