// TODO test this middleware
const rateLimit = require('express-rate-limit');

// Define a rate limiter for login attempts (or any protected action)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes.'
});

const withAuth = (req, res, next) => {
  // Apply rate limiting only if the user is not logged in
  if (!req.session.logged_in) {
    return loginLimiter(req, res, () => {
      res.redirect('/login');
    });
  } else {
    next();
  }
};

module.exports = withAuth;
