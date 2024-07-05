import { validationResult } from 'express-validator';


// Validation middleware
function validation(req, res, next) {
    const errors = validationResult(req);

    // If any of the validation fails
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    // If validation successful
    next();
}

export default validation; // Export the validation middleware