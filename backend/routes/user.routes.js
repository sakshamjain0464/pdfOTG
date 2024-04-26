const router = require('express').Router(); // Initialize router
const passport = require('passport'); // Import Passport
const { body } = require('express-validator'); // Import express-validator for validating requests
const { signup, login, logout } = require('../controllers/user.controllers'); // Import functions to execute on user routes from user controller
const authorize = require('../middlewares/authorize.middleware');  // Import the authorization middleware for securing securing protected routes
const validation = require('../middlewares/validation.middleware');  // Import validation middleware for request validation
const Session = require('../models/sessions.model')

// User registration route
router.post('/register', [
    body('firstname').notEmpty().isAlpha().withMessage('First name is required'),
    body('lastname').notEmpty().isAlpha().withMessage('Last name is required'),
    body('username').notEmpty().isLength({ min: 7 }).withMessage('Username is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().isLength({ min: 7 }).withMessage('Password is required')
], validation, signup);

// User Login Route
router.post('/login',
    [body('username').notEmpty().isLength({ min: 7 }).withMessage('Username is required'),
    body('password').notEmpty().isLength({ min: 7 }).withMessage('Password is required')],
    validation,
    async (req, res, next) => {
        try{
            if(req.isAuthenticated()){
                const sessionID = req.sessionID;
                const user = req.session.passport?.user
                await Session.findOneAndDelete({session : sessionID, userId: user});
            }
            next()
        }
        catch(error){
            console.log(error)
            next()
        }
    },
    passport.authenticate('local'),
    login
);

// User Profile Route
router.get('/getUser', authorize, (req, res) => {
    const user = req.user;
    res.status(200).json({user: { id: user._id, username: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname,  googleID : user.googleId}});
});

// User Logout Route
router.get('/logout', logout);

module.exports = router; // Export the router