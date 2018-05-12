M.AutoInit()

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.timepicker')
  var instances = M.Timepicker.init(elems, options)
})

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.datepicker')
  var instances = M.Datepicker.init(elems, options)
})
let d = new Date()
document.getElementById('prevday').addEventListener('click', function () {
  
  d = today()-1
  console.log(d)
})
console.log('app.js loaded')
