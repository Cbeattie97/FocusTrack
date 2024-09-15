// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const moment = require('moment');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Import Sequelize connection and session store
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize the Express.js app
const app = express();
const PORT = process.env.PORT || 3001;

// Create a Handlebars.js instance
const hbs = exphbs.create({
  helpers: {
    formatDate: function (date) {
      return moment(date).format('MMM D, YYYY');
    },
    eq: function (v1, v2) {
      return v1 === v2;
    }
  }
});

// Configure the session with the Sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Use the session middleware
app.use(session(sess));

// Set up Handlebars.js as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Parse request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the controllers
const pomodoroController = require('./controllers/pomodoroController');
app.use('/public/js/pomodoro', pomodoroController);


app.use(routes);

// Start the Express.js server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});