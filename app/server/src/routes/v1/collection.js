const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const {
  loadCollectionsList,
  loadDocumentList,
  getCollectionSchema
} = require('~/controllers/collection')

router.get('/', requireAuth, trimRequest.all, loadCollectionsList)
router.get('/schema', requireAuth, trimRequest.all, getCollectionSchema)
router.get('/documents', requireAuth, trimRequest.all, loadDocumentList)

module.exports = router