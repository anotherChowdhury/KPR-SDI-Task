import fs from 'fs'
class CSVWriter {
  private writer: fs.WriteStream

  constructor(path: string, headers: string) {
    this.writer = fs.createWriteStream(path)
    this.writer.write(headers)
  }

  getWriter() {
    return this.writer
  }

  write(line: string): void {
    this.writer.write(line)
  }
}

export default CSVWriter
