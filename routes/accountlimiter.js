const rateLimit = require('express-rate-limit'); 

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 100, 
    max: 5, 
    message:
    "Too many accounts created from this IP, please try again after an hour"
});

module.exports = accountLimiter;