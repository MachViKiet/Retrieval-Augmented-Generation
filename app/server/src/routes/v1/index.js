import { Router } from 'express'

const fetch = require('node-fetch')
const cheerio = require('cheerio')

require('~/config/passport')
const router = Router()
/*
 * Load routes statically and/or dynamically
 */

router.use('/', require('./auth'))
router.use('/', require('./profile'))
router.use('/', require('./conservation'))
router.use('/collections', require('./collection'))
router.use('/documents', require('./document'))

/*
 * Setup routes for index
 */
router.get('/admin', (req, res) => {
  res.render('index')
})

router.get('/proxy', async (req, res) => {
  const targetUrl = req.query?.url

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter')
  }

  try {
    const response = await fetch(targetUrl)
    if (!response.ok) {
      return res.status(response.status).send(`Error from target: ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('text/html')) {
      const html = await response.text()
      const $ = cheerio.load(html)

      $('img[src], script[src], link[href], a[href]').each((_, element) => {
        let attr = $(element).is('link') ? 'href' : 'src'
        if ($(element).is('a')) {
          attr = 'href'
        }
        const originalUrl = $(element).attr(attr)
        if (originalUrl) {
          const absoluteUrl = new URL(decodeURI(originalUrl), decodeURI(targetUrl)).href // Xử lý URL tương đối thành tuyệt đối
          const proxiedUrl = `/proxy?url=${absoluteUrl}`
          $(element).attr(attr, proxiedUrl)
        }
      })

      res.send($.html())
    } else {
      response.body.pipe(res) // Không cần sửa với tài nguyên không phải HTML
    }
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`)
  }

  // const options = {
  //   url: targetUrl,
  //   headers: {
  //     'host': 'www.fit.hcmus.edu.vn',
  //     'User-Agent': getBrowserInfo(req)
  //   }
  // }

  // request(options)
  //   .on('error', (err) => res.status(500).send(err.message))
  //   .pipe(res) // Truyền dữ liệu từ server đích về client


})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

export default router
