import { adjacencyList } from './interfaces/adjacencyList.interface'
import VolunteerNode from './volunteerNode'
import fs from 'fs'
import path from 'path'
import Graph from './graph'
import readline from 'readline'
import { dateFormatRegex, headers, readLocation, writeLocation } from './config'

type nodeData = {
  id: string | number
  name: string
  shift: string
  date: string
}

const graph = new Graph()

const csvLocation = path.resolve(__dirname, readLocation)

const readOneLineFromCSV = readline.createInterface({
  input: fs.createReadStream(csvLocation, { encoding: 'utf-8' })
})
readOneLineFromCSV.on('line', (line: string) => {
  const [date, shift, id, name] = line.split(',')
  if (dateFormatRegex.test(date)) putOnGraph({ date, shift, id, name })
})

readOneLineFromCSV.on('error', (err: Error) => {
  console.log('Error while reading file.', err)
})

readOneLineFromCSV.on('close', () => {
  writeToFile(graph.adjacencyList)
})

const writeToFile = (adjacencyList: adjacencyList): void => {
  const location = path.resolve(__dirname, writeLocation)
  const writeStream = fs.createWriteStream(location)

  writeStream.write(`${headers} \r\n`)

  const lines = getLinesToWrite(adjacencyList)

  lines.forEach((line) => writeStream.write(line))

  writeStream.end()

  writeStream.on('finish', () => {
    console.log('Done')
  })

  writeStream.on('error', (err: Error) => {
    console.log(err)
  })
}

const getLinesToWrite = (edgeList: adjacencyList): Array<string> => {
  const volunteers = Object.keys(edgeList)
  const lines: Array<string> = []
  const visited: Set<string> = new Set()
  for (let name of volunteers) {
    const currentRelationsObject = edgeList[name]
    visited.add(name)
    Object.keys(currentRelationsObject).forEach((volunteer) => {
      if (!visited.has(volunteer)) {
        const line = `${name}, ${volunteer}, ${currentRelationsObject[volunteer]} \r\n`
        lines.push(line)
      }
    })
  }

  return lines
}

const putOnGraph = (data: nodeData) => {
  const { id, name, shift, date } = data
  const shiftWithDate = `${shift}-${date}`
  let vertex = graph.getVertex(name)
  if (!vertex) {
    vertex = new VolunteerNode(id, name, shiftWithDate)
    graph.addVertex(vertex)
  } else {
    vertex.addShiftWithDate(shiftWithDate)
  }

  graph.vertices.forEach((node: VolunteerNode) => {
    if (node.getId() === vertex!.getId()) return
    if (node.checkIfShiftWithDateExists(shiftWithDate)) {
      graph.addEdge(vertex!.getName(), node.getName())
    }
  })
}
