import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

const morgan = require('morgan')
const cors = require('cors')

const path = require('path')
const index = require('./view')
const app = express()

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
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(require('~/routes/v1').default)
app.set('views', path.join(__dirname, 'views'))
app.set('storage', path.join(__dirname, 'storage'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.listen(app.get('port'))

let parse_formdata = require('express-form-data')
let os = require('os')

let options_parse_formdata = {
  uploadDir: os.tmpdir(),
  autoClean: true
}

app.use(parse_formdata.parse(options_parse_formdata))
app.use(parse_formdata.format())
app.use(parse_formdata.stream())
app.use(parse_formdata.union())

module.exports = app