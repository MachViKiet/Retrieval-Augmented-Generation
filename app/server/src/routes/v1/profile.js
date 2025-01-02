const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

import validateUpdateProfile from '../../controllers/profile/validators/validateUpdateProfile'

import {
  getProfile,
  updateProfile,
  verifyToken
} from '../../controllers/profile'

import roleAuthorization from '../../controllers/auth/roleAuthorization'


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