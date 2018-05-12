var express = require('express')
var router = express.Router()
const log = require('../models/log.js')
var moment = require('moment')


// var dd = today.getDate()
// var mm = today.getMonth() + 1 //January is 0!
// var yyyy = today.getFullYear()

// if (dd < 10) {
//   dd = '0' + dd
// }

// if (mm < 10) {
//   mm = '0' + mm
// }

// today = mm + '/' + dd + '/' + yyyy

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
  var today = new Date()
  log.findAll({
    where: {
      date: today
    },
    order: ['time']
  }).then(function (result, reject) {
    let yesterday = today
    console.log("Result Log Here:" + result)
    console.log("Reject line here:" + reject)
    let poopCount = 0
    let peeCount = 0
    let milkTotal = 0
    let adjustedDate = 0
    result.forEach(function (element, index, array) {
      if (element.dataValues.poop === true) {
        poopCount += 1
      }
      if (element.dataValues.pee === true) {
        peeCount += 1
      }
      milkTotal += element.dataValues.milk_total
    })
    console.log('poops:' + poopCount)
    if (reject === undefined) {
      adjustedDate = moment(new Date()).format('MMM Do YY') + ' (No Entries Logged Today)'
    } else {
      adjustedDate = moment(result[0].date, 'YYYY-MM-DD').format('MMMM DD, YYYY')
    }
    let totals = {
      one: milkTotal,
      two: poopCount,
      three: peeCount,
      four: adjustedDate,
      five: yesterday.getFullYear(),
      six: yesterday.getMonth() + 1,
      seven: yesterday.getDate() - 1
    }
    var handlebarsData = { log: result, other_data: totals }
    console.log(handlebarsData)
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

router.get('/prev/:yyyy/:mm/:dd/', function (req, res) {
  let today = new Date(req.params.yyyy + ',' + req.params.mm + ',' + req.params.dd)
  let yesterday = new Date(req.params.yyyy + ',' + req.params.mm + ',' + req.params.dd)
  console.log(today)
  console.log(yesterday)
  console.log(yesterday.getFullYear())
  console.log(yesterday.getMonth() + 1)
  console.log(yesterday.getDate() - 1)
  console.log(yesterday.getDate())
  log.findAll({
    where: {
      date: today
    },
    order: ['time']
  }).then(function (result, reject) {
    let adjustedDate = 0
    let poopCount = 0
    let peeCount = 0
    let milkTotal = 0
    result.forEach(function (element, index, array) {
      if (element.dataValues.poop === true) {
        poopCount += 1
      }
      if (element.dataValues.pee === true) {
        peeCount += 1
      }
      milkTotal += element.dataValues.milk_total
    })
    if (reject === undefined) {
      adjustedDate = moment(new Date()).format('MMM Do YY') + ' (No Entries Logged Today)'
    } else {
      adjustedDate = moment(result[0].date, 'YYYY-MM-DD').format('MMMM DD, YYYY')
    }
    console.log('poops:' + poopCount)
    adjustedDate = moment(today, 'YYYY,MM,DD').format('MMMM DD, YYYY')
    let totals = {
      one: milkTotal,
      two: poopCount,
      three: peeCount,
      four: adjustedDate,
      five: yesterday.getFullYear(),
      six: yesterday.getMonth() + 1,
      seven: yesterday.getDate() - 1
    }
    var handlebarsData = { log: result, other_data: totals }
    res.render('day', handlebarsData)
  }).catch(function (error) {
    console.log(error)
  })
})

router.get('/next/:yyyy/:mm/:dd/', function (req, res) {
  let today = new Date(req.params.yyyy + ',' + req.params.mm + ',' + req.params.dd)
  let yesterday = new Date(req.params.yyyy + ',' + req.params.mm + ',' + req.params.dd)
  console.log(today)
  console.log(yesterday)
  console.log(yesterday.getFullYear())
  console.log(yesterday.getMonth() + 1)
  console.log(yesterday.getDate() - 1)
  console.log(yesterday.getDate())
  log.findAll({
    where: {
      date: today
    },
    order: ['time']
  }).then(function (result, reject) {
    let adjustedDate = 0
    let poopCount = 0
    let peeCount = 0
    let milkTotal = 0
    result.forEach(function (element, index, array) {
      if (element.dataValues.poop === true) {
        poopCount += 1
      }
      if (element.dataValues.pee === true) {
        peeCount += 1
      }
      milkTotal += element.dataValues.milk_total
    })
    if (reject === undefined) {
      adjustedDate = moment(new Date()).format('MMM Do YY') + ' (No Entries Logged Today)'
    } else {
      adjustedDate = moment(result[0].date, 'YYYY-MM-DD').format('MMMM DD, YYYY')
    }
    console.log('poops:' + poopCount)
    adjustedDate = moment(today, 'YYYY,MM,DD').format('MMMM DD, YYYY')
    let totals = {
      one: milkTotal,
      two: poopCount,
      three: peeCount,
      four: adjustedDate,
      five: yesterday.getFullYear(),
      six: yesterday.getMonth() + 1,
      seven: yesterday.getDate() + 1
    }
    var handlebarsData = { log: result, other_data: totals }
    res.render('day', handlebarsData)
  }).catch(function (error) {
    console.log(error)
  })
})

module.exports = router
