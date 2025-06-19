import Dexie from "dexie"
import type { Table } from "dexie"

export interface Task {
  id?: number
  name: string
  area: string
  evenWeeks: boolean
  oddWeeks: boolean
  daysOfWeek: number[]
  intervalDays: number | null
  createdAt: string
  completed?: boolean
  postponedUntill?: string
}

export interface Reminder {
    id?: number
    name: string
    note: string
    daysOfWeek: number[]
    time: string
    completedToday?: boolean
}

class ChoreyDB extends Dexie {
  tasks!: Table<Task, number>
  reminders!: Table<Reminder, number>

  constructor() {
    super("ChoreyDB")
    this.version(4).stores({
      tasks: "++id, name, createdAt, postponedUntill, completed",
      reminders: "++id, name",
    })
  }
}

export const db = new ChoreyDB()
