import { Router } from 'express'; // Initialize router
import passport from 'passport'; // Import Passport
import { body } from 'express-validator'; // Import express-validator for validating requests
import { signup, login, logout } from '../controllers/user.controllers.js'; // Import functions to execute on user routes from user controller
import authorize from '../middlewares/authorize.middleware.js'; // Import the authorization middleware for securing protected routes
import validation from '../middlewares/validation.middleware.js'; // Import validation middleware for request validation
import Session from '../models/sessions.model.js'; // Import Session model

const router = Router(); // Initialize the router

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

export default router; // Export the router