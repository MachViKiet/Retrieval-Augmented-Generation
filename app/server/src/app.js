import express from 'express'
import bodyParser from 'body-parser'

const morgan = require('morgan')
const cors = require('cors')

const path = require('path')
const app = express()

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)

// Init all other stuff
app.use(cors())
app.use(require('../routes/v1').default)
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.listen(app.get('port'))

app.get('/', (req, res) => {
  res.end('<h1>Hello World! I am running</h1><hr>')
})

module.exports = app