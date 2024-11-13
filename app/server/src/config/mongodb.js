/* eslint-disable no-console */
/**
 * Updated by Mach Vi Kiet's author on November 3 2024
 */

const mongoose = require('mongoose')
// const mongoURI = 'mongodb://localhost:27017/luan_van_2024'
const mongoURI = process.env.MONGODB_URI // 'mongodb+srv://machkiet252003:i1SsJiOcJ3aydIqB@userstorages.6akwp.mongodb.net/'
const loadModels = require('../models')

module.exports = async function () {
  mongoose.set('strictQuery', false)

  console.log('\n')
  console.log('\x1b[33m%s\x1b[0m', 'Connecting to MongoDB ...')
  return await mongoose.connect(mongoURI)
    .then(() => {
      console.log('\x1b[32m%s\x1b[0m', '*    MongoDB database connection established successfully')
      console.log('\x1b[32m%s\x1b[0m', `*    NODE_ENV: ${process.env.NODE_ENV}`)
      loadModels()
    })
    .catch(( err) => {
      console.log('\x1b[31m%s\x1b[0m', '[Error] Cannot connect to MongoDB')
      throw new Error(err)
    })
}
