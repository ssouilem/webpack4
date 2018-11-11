
const express = require('express')
const path = require('path')
const app = express()
var cors = require('cors')

app.use(cors())

const port = 3000

app.use('/', express.static('/'))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'index.html'))
})
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Headers: Authorization', 'Lang')
  next()
})
app.listen(port, function () {
  console.log('Server Started at port', port)
})
