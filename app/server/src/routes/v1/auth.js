
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
  validateLogin,
  validateRegister
} = require('~/controllers/auth/validators')

const {
  login,
  register,
  feedback
} = require('~/controllers/auth')

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

router.post('/register', trimRequest.all, validateRegister, register)
router.post('/feedback', trimRequest.all, trimRequest.all, feedback)

module.exports = router