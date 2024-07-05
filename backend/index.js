import express from 'express'; // Import express
import connectToDB from './connectToDB.js'; // Import connectToDB for connecting to database
import logger from 'morgan'; // Import morgan
import userRouter from './routes/user.routes.js'; // Import UserRouter to access user routes
import pdfRouter from './routes/pdf.routes.js'; // Import PdfRouter to access pdf routes
import cookieParser from 'cookie-parser'; // Import Cookie Parser
import expressSession from 'express-session'; // Import Express Session
import passport from 'passport'; // Import passport
import './configs/passport.local.config.js'; // Run Passport local authentication configuration
import cors from 'cors'; // Import cors

connectToDB(); // Connect to Database
// configurePassport(); // Configure Passport
const app = express(); // Initialized the app
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
}))
app.use(logger('dev')); // Initialized logger for development
app.use(express.json()); // Use express.json middleware
app.use(cookieParser()); // Use Cookie Parser
app.use(expressSession({
    secret: 'pdfOTG',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000, sameSite: 'lax', httpOnly: false}
}));    // Use express-session for creating sessions
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // use passport.session middleware for passport.session for session based authentication

app.use('/user', userRouter); // Use the user router to access user routes
app.use('/pdf', pdfRouter); // Use the pdf router to access pdf routes

app.listen(3000, () => {
    console.log(`Server Started`);
}) // Start the server

