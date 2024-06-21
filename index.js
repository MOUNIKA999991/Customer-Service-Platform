require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const intercom = require('intercom-client');
const ServiceRequest = require('./models/ServiceRequest');
const User = require('./models/User');
require('./auth/google');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
const intercomClient = new intercom.Client({ token: process.env.INTERCOM_ACCESS_TOKEN });
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});
app.post('/service-request', async (req, res) => {
  const { category, comments } = req.body;
  const serviceRequest = new ServiceRequest({ user: req.user._id, category, comments });
  await serviceRequest.save();
  intercomClient.messages.create({
    message_type: 'inapp',
    body: comments,
    from: { type: 'user', user_id: req.user._id.toString() }
  });
  res.status(201).json(serviceRequest);
});
app.get('/service-requests/:category', async (req, res) => {
  const serviceRequests = await ServiceRequest.find({ category: req.params.category }).populate('user');
  res.json(serviceRequests);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
