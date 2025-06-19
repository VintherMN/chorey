// --------Imports-------
// React
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
// DB
import { db } from "../db"
import type { Task } from "../db"
// Components
import TaskForm from "../components/forms/TaskForm"


// Functions ---------
const EditTaskView = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const [task, setTask] = useState<Task | null>(null)

   useEffect(() => {
      const fetchTask = async () => {
         if (!id) return
         const numericId = Number(id)
         if (isNaN(numericId)) return

         const doc = await db.tasks.get(numericId)
         if (doc) setTask(doc)
      }

      fetchTask()
   }, [id])

   const handleSubmit = async (updatedTask: Omit<Task, "id" | "createdAt" | "completed">) => {
      if (!id) return
      const numericId = Number(id)
      if (isNaN(numericId)) return

      await db.tasks.put({
         ...updatedTask,
         id: numericId,
         // Fallback
         createdAt: task?.createdAt ?? new Date().toISOString(),
         // Keeps state
         completed: task?.completed ?? false
      })

      navigate(-1)
   }

   if (!task) return <p>Indlæser opgave...</p>

   return (
      <div className="p-4">
         <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            mode="edit"
         />
      </div>
   )
}


// Exports ------
export default EditTaskView
