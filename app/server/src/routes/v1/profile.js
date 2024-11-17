const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('~/controllers/auth')

const {
  getProfile,
  updateProfile,
  verifyToken
} = require('~/controllers/profile')

const { validateUpdateProfile } = require('~/controllers/profile/validators')

router.get(
  '/',
  requireAuth,
  roleAuthorization(['user', 'administrator', 'student', 'researcher']),
  trimRequest.all,
  getProfile
)

router.get('/verifyToken', requireAuth, trimRequest.all, verifyToken)

router.patch(
  '/',
  requireAuth,
  roleAuthorization(['user', 'administrator', 'student', 'researcher']),
  trimRequest.all,
  validateUpdateProfile,
  updateProfile
)

module.exports = router