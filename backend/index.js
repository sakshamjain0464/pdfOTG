const express = require('express'); // Import express
const connectToDB = require('./connectToDB'); // Import connectToDB for connecting to database
const logger = require('morgan'); // Import morgan
const userRouter = require('./routes/user.routes'); // Import UserRouter to access user routes
const cookieParser = require('cookie-parser'); // Import Cookie Parser
const expressSession = require('express-session'); // Import Express Session
const passport = require('passport'); // Import passport
require('./configs/passport.local.config'); // Run Passport local authentication configuration

connectToDB(); // Connect to Database
const app = express(); // Initialized the app
app.use(logger('dev')); // Initialized logger for development
app.use(express.json()); // Use express.json middleware
app.use(cookieParser()); // Use Cookie Parser
app.use(expressSession({ 
    secret: 'pdfOTG',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 }
}));    // Use express-session for creating sessions
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // use passport.session middleware for passport.session for session based authentication

app.use('/user', userRouter); // Use the user router to access user routes

app.listen(3000, () => {
    console.log(`Server Started`);
}) // Start the server