require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const isAdmin = require('./middleware/isAdmin');
const app = express();
const verifyToken  = require('./middleware/auth');
const passport = require('passport');
const session = require('express-session');

app.use(bodyParser.json());

app.use(session({
  secret: 'I does not have a secret to reveal',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


app.use('/auth', authRoutes);
app.use('/profile', profileRoutes); 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
