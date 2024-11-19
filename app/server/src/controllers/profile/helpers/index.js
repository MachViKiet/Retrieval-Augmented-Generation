const { getProfileFromDB } = require('./getProfileFromDB')
const { getUserByToken } = require('./getUserByToken')
const { updateProfileInDB } = require('./updateProfileInDB')

module.exports = {
  getProfileFromDB,
  updateProfileInDB,
  getUserByToken
}
