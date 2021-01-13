import Graph from '../src/graph'
import VolunteerNode from '../src/volunteerNode'

const data = [
  { id: 1, name: 'Umar', shift: '4-5', date: '2020/01/10' },
  { id: 2, name: 'Choyon', shift: '6-7', date: '2020/01/10' },
  { id: 3, name: 'Safwat', shift: '4-5', date: '2020/01/10' },
  { id: 4, name: 'Jaber', shift: '4-5', date: '2020/01/10' },
  { id: 1, name: 'Umar', shift: '4-5', date: '2020/01/11' },
  { id: 4, name: 'Jaber', shift: '4-5', date: '2020/01/11' },
  { id: 5, name: 'Alvi', shift: '6-7', date: '2020/01/11' },
  { id: 2, name: 'Choyon', shift: '6-7', date: '2020/01/11' },
  { id: 3, name: 'Safwat', shift: '6-7', date: '2020/01/11' },
  { id: 6, name: 'Amin', shift: '6-7', date: '2020/01/13' }
]

test('adding vertices to graph and edges with weight', () => {
  const graph = new Graph()

  for (let i = 0; i < data.length; i++) {
    const { id, name, shift, date } = data[i]
    const shiftWithDate = `${shift}-${date}`
    let vertex = graph.getVertex(name)
    if (!vertex) {
      vertex = new VolunteerNode(id, name, shiftWithDate)
      graph.addVertex(vertex)
    } else {
      vertex.addShiftWithDate(shiftWithDate)
    }

    graph.vertices.forEach((node) => {
      if (node.getId() === vertex!.getId()) return
      if (node.checkIfShiftWithDateExists(shiftWithDate)) {
        graph.addEdge(vertex!.getName(), node.getName())
      }
    })
  }
  const names = ['Umar', 'Amin', 'Safwat', 'Choyon', 'Jaber', 'Alvi']

  graph.vertices.forEach((vertex) => {
    expect(names.includes(vertex.getName())).toBe(true)
  })

  const result = {
    Umar: { Safwat: 1, Jaber: 2 },
    Choyon: { Alvi: 1, Safwat: 1 },
    Safwat: { Umar: 1, Jaber: 1, Choyon: 1, Alvi: 1 },
    Jaber: { Umar: 2, Safwat: 1 },
    Alvi: { Choyon: 1, Safwat: 1 },
    Amin: {}
  }

  expect(graph.adjacencyList['Umar']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Umar']['Jaber']).toBe(2)
  expect(graph.adjacencyList['Choyon']['Alvi']).toBe(1)
  expect(graph.adjacencyList['Choyon']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Safwat']['Choyon']).toBe(1)
  expect(graph.adjacencyList['Safwat']['Umar']).toBe(1)
  expect(graph.adjacencyList['Safwat']['Alvi']).toBe(1)
  expect(graph.adjacencyList['Jaber']['Umar']).toBe(2)
  expect(graph.adjacencyList['Jaber']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Alvi']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Alvi']['Choyon']).toBe(1)
})

test('checking if adjacencylist and weight is correct or not', () => {
  const graph = new Graph()

  for (let i = 0; i < data.length; i++) {
    const { id, name, shift, date } = data[i]
    const shiftWithDate = `${shift}-${date}`
    let vertex = graph.getVertex(name)
    if (!vertex) {
      vertex = new VolunteerNode(id, name, shiftWithDate)
      graph.addVertex(vertex)
    } else {
      vertex.addShiftWithDate(shiftWithDate)
    }

    graph.vertices.forEach((node) => {
      if (node.getId() === vertex!.getId()) return
      if (node.checkIfShiftWithDateExists(shiftWithDate)) {
        graph.addEdge(vertex!.getName(), node.getName())
      }
    })
  }
  const names = ['Umar', 'Amin', 'Safwat', 'Choyon', 'Jaber', 'Alvi']

  graph.vertices.forEach((vertex) => {
    expect(names.includes(vertex.getName())).toBe(true)
  })

  const result = {
    Umar: { Safwat: 1, Jaber: 2 },
    Choyon: { Alvi: 1, Safwat: 1 },
    Safwat: { Umar: 1, Jaber: 1, Choyon: 1, Alvi: 1 },
    Jaber: { Umar: 2, Safwat: 1 },
    Alvi: { Choyon: 1, Safwat: 1 },
    Amin: {}
  }

  expect(graph.adjacencyList['Umar']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Umar']['Jaber']).toBe(2)
  expect(graph.adjacencyList['Choyon']['Alvi']).toBe(1)
  expect(graph.adjacencyList['Choyon']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Safwat']['Choyon']).toBe(1)
  expect(graph.adjacencyList['Safwat']['Umar']).toBe(1)
  expect(graph.adjacencyList['Safwat']['Alvi']).toBe(1)
  expect(graph.adjacencyList['Jaber']['Umar']).toBe(2)
  expect(graph.adjacencyList['Jaber']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Alvi']['Safwat']).toBe(1)
  expect(graph.adjacencyList['Alvi']['Choyon']).toBe(1)
})
