class VolunteerNode {
  private id: string | number
  private name: string
  private shiftWithDates: Set<string>
  constructor(id: string | number, name: string, shiftWithDate: string) {
    this.id = id
    this.name = name
    this.shiftWithDates = new Set<string>().add(shiftWithDate)
  }

  public getName(): string {
    return this.name
  }

  public getId(): string | number {
    return this.id
  }

  public getShiftsWithDate(): Set<string> {
    return this.shiftWithDates
  }

  public addShiftWithDate(shiftWithDate: string): void {
    if (!this.shiftWithDates.has(shiftWithDate)) this.shiftWithDates.add(shiftWithDate)
  }

  public checkIfShiftWithDateExists(shiftWithDate: string): boolean {
    return this.shiftWithDates.has(shiftWithDate)
  }
}

export default VolunteerNode
