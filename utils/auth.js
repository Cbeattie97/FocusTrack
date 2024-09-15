const rateLimit = require('express-rate-limit');

// Define a rate limiter for login attempts (or any protected action)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  handler: (req, res) => {
    res.status(429).send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f8f9fa;
              color: #333;
            }
            .message-container {
              text-align: center;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
              animation: fadeIn 2s ease-in-out;
            }
            .message-container h1 {
              color: #dc3545;
              font-size: 2em;
              margin-bottom: 10px;
            }
            .message-container p {
              font-size: 1.2em;
              margin: 0;
            }
            .message-container #timer {
              font-size: 1.5em;
              margin-top: 20px;
              color: #007bff;
              animation: pulse 1s infinite;
            }
            .status-code {
              margin-top: 20px;
              font-size: 1.1em;
              color: #dc3545;
            }

            /* Animation for fade in effect on the message container */
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            /* Animation for pulsing timer */
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          </style>
        </head>
        <body>
          <div class="message-container">
            <h1>Too Many Requests</h1>
            <p>You've made too many login attempts.<br> Please try again in:</p>
            <div id="timer">15:00</div>
            <div class="status-code">Status Code: 429</div>
          </div>

          <script>
            // Set the initial countdown time (15 minutes)
            let timeLeft = 15 * 60;

            // Function to format the time as MM:SS
            function formatTime(seconds) {
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              return \`\${minutes.toString().padStart(2, '0')}\:\${remainingSeconds.toString().padStart(2, '0')}\`;
            }

            // Update the countdown every second
            const timerElement = document.getElementById('timer');
            const countdownInterval = setInterval(() => {
              timeLeft--;
              timerElement.textContent = formatTime(timeLeft);

              // When countdown reaches 0, redirect to login page
              if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                window.location.href = '/login'; // Redirect to login page
              }
            }, 1000);
          </script>
        </body>
      </html>
    `);
  }
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
