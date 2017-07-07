let LocalStrategy = require('passport-local').Strategy;

import User from '../models/User';

export default function passportConfig(passport) {
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {

	        // find a user whose email is the same as the forms email
	        // we are checking to see if the user trying to login already exists
	        User.findOne({ 'local.email' :  email }, (err, user) => {
	            // if there are any errors, return the error
	            if (err) {
	                return done(err);
	            }

	            // check to see if theres already a user with that email
	            if (user) {
	            	console.log('found user with that email');
	                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
	            } else {

	                // if there is no user with that email
	                // create the user
	                var newUser = new User();

	                // set the user's local credentials
	                newUser.local.email = email;
	                newUser.local.password = newUser.generateHash(password);

	                // save the user
	                newUser.save((err) => {
	                    if (err) {
	                        throw err;
	                    }
	                    return done(null, newUser);
	                });
	            }

	        });    

        });

    }));
}