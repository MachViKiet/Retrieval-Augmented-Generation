const express = require('express')
const router = express.Router()
require('~/config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('~/controllers/auth')

const { getMessages } = require('~/controllers/conservation')


router.get(
  '/chat',
  requireAuth,
  roleAuthorization(['user', 'administrator', 'student', 'researcher']),
  trimRequest.all,
  getMessages
)

module.exports = router
