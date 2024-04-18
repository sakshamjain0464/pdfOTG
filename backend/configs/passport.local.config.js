const passport = require('passport');     // Import passport
const LocalStrategy = require('passport-local').Strategy; // Import the local strategy
const User = require('../models/user.model');    // Import user model

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });          // Find the user
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Verify Password
            if (!await user.verifyPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            // If user is found execute the login function
            return done(null, user);
        }
        catch (error) {
            return done(error, false, { message: 'Error' });
        }
    }
));