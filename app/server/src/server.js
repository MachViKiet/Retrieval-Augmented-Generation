/* eslint-disable no-console */
/**
 * Updated by Mach Vi Kiet's author on November 3 2024
 */

require('dotenv').config()


import express from 'express'
import bodyParser from 'body-parser'


const morgan = require('morgan')
const cors = require('cors')

const path = require('path')
const app = express()
const initMongo = require('./config/mongodb')

app.set('port', process.env.APP_PORT || 3000)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

// Init all other stuff
app.use(cors())
app.use(require('~/routes/v1').default)
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.listen(app.get('port'))

app.get('/', (req, res) => {
  res.end('<h1>Hello World! I am running</h1><hr>')
})

initMongo()

app.listen(() => {
  console.log('\x1b[33m%s\x1b[0m', `\n\n\nServer is listening at http://${ process.env.APP_HOST }:${ process.env.APP_PORT }/`)
})

module.exports = app
