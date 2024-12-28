
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
  validateLogin,
  validateRegister
} = require('~/controllers/auth/validators')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const {
  login,
  register,
  feedback,
  validateEmail
} = require('~/controllers/auth')

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

router.post('/register', trimRequest.all, validateRegister, register)
router.post('/feedback', requireAuth, trimRequest.all, feedback)
router.get('/verifyEmail', trimRequest.all, validateEmail)

module.exports = router