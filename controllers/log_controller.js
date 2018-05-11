var express = require('express')
var router = express.Router()
const log = require('../models/log.js')

var today = new Date()
var dd = today.getDate()
var mm = today.getMonth() + 1 //January is 0!
var yyyy = today.getFullYear()

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

today = mm + '/' + dd + '/' + yyyy

router.get('/', (req, res) => {
  res.render('index')
})

/*
DEFAULT,
'2018-05-11',
'10:34 AM','on'
,'on',
'5',
'2018-05-11 17:34:56.753 +00:00',
'2018-05-11 17:34:56.753 +00:00'
*/

router.post('/log', (req, res) => {
  log.create({
    date: req.body.date,
    time: req.body.time,
    poop: req.body.poop,
    pee: req.body.pee,
    milk_total: req.body.milk_total
  }).then(function () {
    res.redirect('/day')
  }).catch(function (error) {
    return error
  })
})

router.get('/day', (req, res) => {
  log.findAll({
    where: {
      date: today
    },
    order: ['time']
  }).then(function (result) {
    let poopCount = 0
    let peeCount = 0
    let milkTotal = 0
    result.forEach(function (element, index, array) {
      console.log('Hello', index)
      console.log(element.dataValues.poop)
      if (element.dataValues.poop === true) {
        poopCount += 1
      }
      if (element.dataValues.pee === true) {
        peeCount += 1
      }
      milkTotal += element.dataValues.milk_total
    })
    console.log('poops:' + poopCount)
    let totals = {
      one: milkTotal,
      two: poopCount,
      three: peeCount
    }
    var handlebarsData = { log: result, other_data: totals }
    console.log(result[0])
    res.render('day', handlebarsData)
  }).catch(function (error) {
    console.log(error)
  })
})

router.post('/', (req, res) => {
  log.create({
    log: req.body.burger_name
  }).then(() => {
    res.redirect('/')
  }).catch(function (error) {
    console.log(error)
  })
})

router.post('/burgers/:id', function (req, res) {
  burger.update({
    devoured: true
  },
    { where: { id: req.params.id } })
    .then(function (res) {
      res.redirect('/')
    }).catch(function (error) {
      console.log(error)
    })
})
router.post('/burgers/re_add/:id', function (req, res) {
  burger.update({
    devoured: false
  },
    { where: { id: req.params.id } })
    .then(function (res) {
      res.redirect('/')
    }).catch(function (error) {
      console.log(error)
    })
})

module.exports = router
