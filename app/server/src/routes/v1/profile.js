const express = require('express')
const router = express.Router()
require('~/config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('~/controllers/auth')

const {
  getProfile,
  updateProfile
} = require('~/controllers/profile')

const { validateUpdateProfile } = require('~/controllers/profile/validators')

router.get(
  '/',
  requireAuth,
  // roleAuthorization(['user', 'administrator']),
  trimRequest.all,
  getProfile
)

router.patch(
  '/',
  requireAuth,
  // roleAuthorization(['user', 'administrator']),
  trimRequest.all,
  validateUpdateProfile,
  updateProfile
)

module.exports = router