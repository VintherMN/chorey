// Imports
import type { Task, Reminder } from "../db"


// Interfaces
export interface TaskFormProps {
  mode: "create" | "edit"
  initialData?: Partial<Task>
  onSubmit: (data: Omit<Task, "id" | "createdAt" | "completed">) => void
}

export interface ReminderFormProps {
  mode: "create" | "edit"
  initialData?: Partial<Reminder>
  onSubmit: (data: Omit<Reminder, "id">) => void
}

// Types
