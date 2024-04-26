const Session = require('../models/sessions.model');       // Import Session Model
const User = require('../models/user.model');

// Authorization middleware
async function authorize(req, res, next) {
    try {
        if(req.isAuthenticated()) {          // If user is authenticated
            const userSession = await Session.findOne({ session: req.sessionID, userId: req.session.passport.user }); // Find the session

            console.log(userSession);

            if(userSession) {          // If session does not exist
                req.user = await User.findById(req.session.passport.user)
                return next()
            }
        }

        // If session exists
        return res.status(401).json({ error: 'Unauthorized' });
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}

module.exports = authorize;