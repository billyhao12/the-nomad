require('dotenv').config();

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes');

// Middleware defined
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.set('query parser', 'extended')

app.use(passport.initialize());
require('./config/passport')(passport);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.use('/api',require('./routes/authController'));
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//Connection to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb://localhost/nomad',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
