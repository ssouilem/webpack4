const path = require('path')
const router = require('express').Router()

router
  .get('/*', (req, res, next) => {
    const routePath = path.resolve(__dirname, '../index.html')
    res.sendFile(routePath)
  })

module.exports = router
