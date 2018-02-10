import Plant from './Plant.js'
import Color from './Color.js'

let p = document.getElementById('plantas')
let cy = document.getElementById('coyotes')
let c = document.getElementById('conejos')
let count = 0

function randomSign () {
  return Math.random() < 0.5 ? 1 : -1
}

var data = {
  labels: [0],
  datasets: [{
    label: 'Poblacion Conejos',
    data: [0],
    borderColor: 'rgba(0, 0, 255, 0.5)'
  }, {
    label: 'Poblacion Coyotes',
    data: [0],
    borderColor: 'rgba(255, 0, 0, 0.5)'
  }, {
    label: 'Poblacion Plantas',
    data: [0],
    borderColor: 'rgba(0, 255, 0, 0.5)'
  }]
}

var data2 = {
  labels: [0],
  datasets: [{
    label: 'Genes verdes',
    data: [0],
    borderColor: 'rgba(0, 255, 0, 0.5)'
  }, {
    label: 'Genes rojos',
    data: [0],
    borderColor: 'rgba(255, 0, 0, 0.5)'

  }, {
    label: 'Genes azules',
    data: [0],
    borderColor: 'rgba(0, 0, 255, 0.5)'

  }]
}

var updateData = function (oldData, newData) {
  var labels = oldData['labels']
  var dataSetA = oldData['datasets'][0]['data']
  var dataSetB = oldData['datasets'][1]['data']
  var dataSetC = oldData['datasets'][2]['data']

  // labels.shift()
  count++

  labels.push(count.toString())

  dataSetA.push(newData.A)
  dataSetB.push(newData.B)
  dataSetC.push(newData.C)
  if (labels.length >= 100) {
    labels.shift()
    dataSetA.shift()
    dataSetB.shift()
    dataSetC.shift()
  }
}

var updateData2 = function (oldData, newData) {
  var labels = oldData['labels']
  var dataSetA = oldData['datasets'][0]['data']
  var dataSetB = oldData['datasets'][1]['data']
  var dataSetC = oldData['datasets'][2]['data']
  count++

  labels.push(count.toString())
  dataSetA.push(newData.A)
  dataSetB.push(newData.B)
  dataSetC.push(newData.C)

  if (labels.length >= 300) {
    labels.shift()
    dataSetA.shift()
    dataSetB.shift()
    dataSetC.shift()
  }
}
let newData2

function start (plantas, conejos, coyotes) {
  setInterval(() => {
    p.innerText = `Poblacion de plantas: ${plantas.length}`
    c.innerText = `Poblacion de conejos: ${conejos.length}`
    cy.innerText = `Poblacion de coyotes: ${coyotes.length}`

    let newData = {
      A: conejos.length,
      B: coyotes.length,
      C: plantas.length
    }
    newData2 = {
      A: (conejos.reduce((valorAnterior, valorActual) => {
        return valorAnterior + valorActual.gens.VISGEN
      }, conejos[0].gens.VISGEN) / conejos.length) / 10,
      B: conejos.reduce((valorAnterior, valorActual) => {
        return valorAnterior + valorActual.gens.VECGEN
      }, conejos[0].gens.VECGEN) / conejos.length,
      C: conejos.reduce((valorAnterior, valorActual) => {
        return valorAnterior + valorActual.gens.REPGEN
      }, conejos[0].gens.REPGEN) / conejos.length
    }

    let color = new Color(newData2.B, newData2.C, newData2.A)
    document.getElementById('color').style.backgroundColor = color.rgb()
    updateData(data, newData)

    updateData2(data2, newData2)

    window.myChart2.data.datasets = data2.datasets
    window.myChart2.data.labels = data2.labels
    window.myChart2.update()

    window.myChart.data.datasets = data.datasets
    window.myChart.data.labels = data.labels
    window.myChart.update()
  }, 2000)
}

function generateBunny (bunny, gens) {
  let genes = {
    VISGEN: gens.VISGEN + (randomSign(Math.random() * 0.05)),
    VECGEN: gens.VECGEN + (randomSign(Math.random() * 0.05)),
    REPGEN: gens.REPGEN + (randomSign(Math.random() * 0.05))
  }
  bunny.push(randomSign() * Math.random() * 3 * window.innerWidth, randomSign() * Math.random() * 3 * window.innerHeight, bunny, genes)
}

export { start }
