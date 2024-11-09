import { Router } from 'express'
const router = Router()

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
router.use('/', require('./auth'))
router.use('/', require('./profile'))

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
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
