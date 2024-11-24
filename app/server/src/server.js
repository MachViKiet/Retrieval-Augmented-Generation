/* eslint-disable no-console */
/**
 * Updated by Mach Vi Kiet's author on November 3 2024
 */
import './app'
const http = require('http')
const initMongo = require('./config/mongodb')
const app = require('./app.js')
const io = require('./socket')

async function bootstrap () {

  await initMongo()

  return http.createServer(app).listen(process.env.APP_PORT || 3000)
}

bootstrap().then(async (server) => {

  io.attach(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  console.log('\n')
  console.log('\x1b[36m', `Server is listening at http://${ process.env.APP_HOST }:${ process.env.APP_PORT }/`)
}).catch((err) => {
  console.log(err)
})

module.exports = app
