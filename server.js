const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8080
const routes = require('./controllers/log_controllers.js')
const exphbs = require('express-handlebars')

// Express Static Folder
app.use(express.static('public'))

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
