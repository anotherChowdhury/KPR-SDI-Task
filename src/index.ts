import { adjacencyList } from './interfaces/adjacencyList.interface'
import VolunteerNode from './volunteerNode'
import fs from 'fs'
import path from 'path'
import Graph from './graph'
import readline from 'readline'
import { dateFormatRegex, headers, readLocation, writeLocation } from './constants'

type nodeData = {
  id: string | number
  name: string
  shift: string
  date: string
}

const graph = new Graph()

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
  const location = path.resolve(__dirname, writeLocation)
  const writeStream = fs.createWriteStream(location)
  writeStream.write(`${headers} \r\n`)
  writeToCSV(graph.adjacencyList, writeStream)
  writeStream.end()
  writeStream
    .on('finish', () => {
      console.log('finish write stream, moving along')
    })
    .on('error', (err: Error) => {
      console.log(err)
    })
})

const writeToCSV = (edgeList: adjacencyList, writeStream: fs.WriteStream) => {
  const keys = new Set(Object.keys(edgeList))
  for (let key of keys) {
    const currentKey = key
    const currentVolunteerRelationsObject = edgeList[currentKey]
    keys.delete(key)
    Object.keys(currentVolunteerRelationsObject).forEach((volunteer) => {
      if (keys.has(volunteer)) {
        const line = `${key}, ${volunteer}, ${currentVolunteerRelationsObject[volunteer]} \r\n`
        writeStream.write(line)
      }
    })
  }
}
