// Imports
import { useEffect, useState } from "react"
import { db, type Task, type Reminder } from "../db"
import { useNavigate } from "react-router-dom"

// Functions
const ManageView = () => {
   const [tasks, setTasks] = useState<Task[]>([])
   const [reminders, setReminders] = useState<Reminder[]>([])
   const navigate = useNavigate()

   useEffect(() => {
      const fetch = async () => {
         const allTasks = await db.tasks.toArray()
         const allReminders = await db.reminders.toArray()
         setTasks(allTasks)
         setReminders(allReminders)
      }
      fetch()
   }, [])

   // Delete Task logic
   const handleDeleteTask = async (task: Task) => {
      if (!task.id) return
      const confirmDelete = confirm(`Slet opgave "${task.name}"?`)
      if (confirmDelete) {
         await db.tasks.delete(task.id)
         const updated = await db.tasks.toArray()
         setTasks(updated)
      }
   }

   // Delete Reminder Logic
   const handleDeleteReminder = async (reminder: Reminder) => {
      if (!reminder.id) return
      const confirmDelete = confirm(`Slet reminder "${reminder.name}"?`)
      if (confirmDelete) {
         await db.reminders.delete(reminder.id)
         const updated = await db.reminders.toArray()
         setReminders(updated)
      }
   }
   // Return View
   return (
      <div className="p-4 max-w-md mx-auto">
         {/* Tasks */}
         <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Opgaver</h2>
            <ul className="space-y-2">
               {tasks.map(task => (
                  <li
                     key={task.id}
                     className="bg-white p-3 rounded shadow border flex justify-between items-center"
                  >
                     <div>
                        <strong>{task.name}</strong>
                        <div className="text-sm text-gray-500">{task.area}</div>
                     </div>
                     <div className="flex gap-2 text-sm">
                        <button
                           onClick={() =>
                              navigate(`/edit/task/${task.id}`)
                           }
                           className="text-blue-600 hover:underline"
                        >
                           Redigér
                        </button>
                        <button
                           onClick={() => handleDeleteTask(task)}
                           className="text-red-600 hover:underline"
                        >
                           Slet
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>

         {/* Reminders */}
         <div>
            <h2 className="text-lg font-semibold mb-2">Reminders</h2>
            <ul className="space-y-2">
               {reminders.map(reminder => (
                  <li
                     key={reminder.id}
                     className="bg-yellow-100 p-3 rounded shadow border flex justify-between items-center"
                  >
                     <div>
                        <strong>{reminder.name}</strong>
                        <div className="text-sm text-gray-700">
                           {reminder.note} kl. {reminder.time}
                        </div>
                     </div>
                     <div className="flex gap-2 text-sm">
                        <button
                           onClick={() =>
                              navigate(`/edit/reminder/${reminder.id}`)
                           }
                           className="text-blue-600 hover:underline"
                        >
                           Redigér
                        </button>
                        <button
                           onClick={() => handleDeleteReminder(reminder)}
                           className="text-red-600 hover:underline"
                        >
                           Slet
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

// Export
export default ManageView