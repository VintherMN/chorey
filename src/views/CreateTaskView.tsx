// Imports
// Components
import TaskForm from "../components/forms/TaskForm"
// React
import { useNavigate } from "react-router-dom"
// DB (Dexie) and props
import { db } from "../db"
import type { Task } from "../db"

// Functions
const CreateTaskView = () => {
  const navigate = useNavigate()

  const handleSubmit = async (
    taskData: Omit<Task, "id" | "createdAt" | "completed">
  ) => {
    await db.tasks.add({
      ...taskData,
      createdAt: new Date().toISOString(),
      completed: false,
    })
    navigate("/")
  }

  return (
    <div>
      <TaskForm
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  )
}

// Exports
export default CreateTaskView
