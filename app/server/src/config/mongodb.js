/* eslint-disable no-console */
/**
 * Updated by Mach Vi Kiet's author on November 3 2024
 */

const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/luan_van_2024'
const loadModels = require('~/models')

module.exports = async function () {
  const dbStatusSuccess = '*    MongoDB database connection established successfully'

  const connect_v2 = async () => {
    try {
      mongoose.set('strictQuery', false)
      mongoose.connect(mongoURI)
    } catch {() => {
      process.exit(1)
    }}
  }

  await connect_v2()

  mongoose.connection.on('error', () => console.log('\x1b[31m%s\x1b[0m', 'Error connecting to MongoDB'))
  mongoose.connection.on('disconnected', connect_v2)
  mongoose.connection.once('open', () => {
    console.log('\x1b[32m%s\x1b[0m', dbStatusSuccess)
    console.log('\x1b[32m%s\x1b[0m', `*    NODE_ENV: ${process.env.NODE_ENV}`)
  })

  loadModels()

}
