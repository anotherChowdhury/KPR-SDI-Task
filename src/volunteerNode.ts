class VolunteerNode {
  private id: string | number
  private name: string
  private shiftWithDates: Set<string>
  constructor(id: string | number, name: string, shiftWithDate: string) {
    this.id = id
    this.name = name
    this.shiftWithDates = new Set<string>().add(shiftWithDate)
  }

  getName(): string {
    return this.name
  }

  getId(): string | number {
    return this.id
  }

  addShiftWithDate(shiftWithDate: string): void {
    if (!this.shiftWithDates.has(shiftWithDate)) this.shiftWithDates.add(shiftWithDate)
  }

  checkIfShiftWithDateExists(shiftWithDate: string): boolean {
    return this.shiftWithDates.has(shiftWithDate)
  }
}

export default VolunteerNode
