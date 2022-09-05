const express = require('express')
const routes = express.Router()

const passport = require('passport')

routes.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
routes.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)
routes.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

routes.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failWithError: true,
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = routes
