const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8080
const routes = require('./controllers/log_controller.js')
const exphbs = require('express-handlebars')
const path = require('path')

// Express Static Folder
app.use(express.static(path.resolve(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Handlebars Middleware

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/', routes)

app.listen(PORT, function () {
  console.log('Baby Tracker App now listening at localhost:' + PORT)
})
