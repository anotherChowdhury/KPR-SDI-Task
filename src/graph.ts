import { adjacencyList } from './interfaces/adjacencyList.interface'
import volunteerNode from './volunteerNode'

class Graph {
  public adjacencyList: adjacencyList
  public vertices: volunteerNode[]
  constructor() {
    this.adjacencyList = {}
    this.vertices = []
  }
  public addVertex(node: volunteerNode) {
    const name = node.getName()
    this.vertices.push(node)
    if (!this.adjacencyList[name]) this.adjacencyList[name] = {}
  }

  public getVertex(name: string) {
    for (const vertex of this.vertices) {
      if (vertex.getName() === name) {
        return vertex
      }
    }
    return null
  }

  public addEdge(source: string, destination: string) {
    if (!this.adjacencyList[source][destination]) {
      this.adjacencyList[source][destination] = 1
      this.adjacencyList[destination][source] = 1
    } else {
      this.adjacencyList[source][destination]++
      this.adjacencyList[destination][source]++
    }
  }
}

export default Graph
