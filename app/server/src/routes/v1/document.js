const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
// const { roleAuthorization } = require('~/controllers/auth')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const { getChunkInDocument } = require('~/controllers/document')

// router.get('/all',
//   requireAuth,
//   roleAuthorization(['user', 'administrator', 'student', 'researcher']),
//   trimRequest.all,
//   loadCollectionsList)
router.get('/chunks', requireAuth, trimRequest.all, getChunkInDocument)

module.exports = router