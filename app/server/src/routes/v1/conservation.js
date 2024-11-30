const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  newChat,
  loadConservationList,
  loadHistoryInSession,
  removeConservationInDB,
  updateConservationInDB
} = require('~/controllers/conservation')

router.post('/newChat', requireAuth, trimRequest.all, newChat)
router.get('/chatSession', requireAuth, trimRequest.all, loadConservationList)
router.post('/historyInChatSession', requireAuth, trimRequest.all, loadHistoryInSession)
router.delete('/removeChat', requireAuth, trimRequest.all, removeConservationInDB)
router.post('/updateChat', requireAuth, trimRequest.all, updateConservationInDB)

module.exports = router