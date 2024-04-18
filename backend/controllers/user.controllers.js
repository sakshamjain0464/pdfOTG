const User = require('../models/user.model');       // Import user model
const passport = require('passport');
const Session = require('../models/sessions.model');

// Signup comtroller
async function signup(req, res) {
    try {
        const { firstname, lastname, username, email, password } = req.body;        // Extracting required information
        const newUser = new User({ firstname, lastname, username, email });        // Creating new user
        newUser.password = await newUser.createPasswordHash(password);              // Hashing Password
        await newUser.save();                                                     // Save the new user
        return res.status(200).json({ message: 'User Registered' });                      
    }
    catch (error) {
        res.status(400).send('Error Registering User');
        console.log(error);
    }
}

// Login Controller
async function login(req, res) {
    try {
        const { sessionID, user } = req;               // Exttact the session if from request
        console.log(user)
        // Create a new session
        const newSession = new Session({ session: sessionID, userId: user._id });
        await newSession.save();         // Save the session info
        res.status(200).json({ message: 'Logged In' });
    }
    catch (error) {
        res.status(400).json({message: "Error Logging in"});
        console.log(error);
    }
}

// Logout Controller
async function logout(req, res) {
    try {
        // Extract the session id and userid
        const sessionId = req.sessionID;
        const userId = req.session.passport?.user;

        if (!userId) { return res.status(401).json({ error: 'Unauthorized' });}       // If the userid does not exist session is invalid

        // Logout the user using logout function provided by passport js
        // This will deserialize the user from the request and will destroy the session
        req.logout(function (err) {
            if (err) {return res.status(400).json({ error: err }); }
        });

        // Delete the session info from database
        await Session.findOneAndDelete({ session: sessionId, userId: userId });

        res.status(200).json({ message: 'Logged Out' });
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}

// Serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user
passport.deserializeUser((id, done) => {
    try {
        const user = User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});

module.exports = { signup, login, logout };        // Export the controllers