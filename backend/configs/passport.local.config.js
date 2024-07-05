import passport from 'passport'; // Import passport
import passportLocal from 'passport-local'; // Import passport-local
import User from '../models/user.model.js'; // Import the user model

const LocalStrategy = passportLocal.Strategy; // Initialize the local strategy


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
