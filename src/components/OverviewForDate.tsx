// Imports
import { useEffect, useState } from "react"
import { db, type Task, type Reminder } from "../db"
import { formatISO } from "date-fns"
import { getTasksForDate, getRemindersForDate } from "../utils/helpers"
import { useEditFormFactory } from "../utils/editFormFactory"


// Functions
export const OverviewForDate = ({
   date,
   onClose,
}: {
   date: Date
   onClose: () => void
}) => {
   // Factory calls
   const taskEdit = useEditFormFactory()
   const reminderEdit = useEditFormFactory()

   // State hooks
   const [tasks, setTasks] = useState<Task[]>([])
   const [reminders, setReminders] = useState<Reminder[]>([])


   // ----------- TASKS -----------------
   // Delete a task with confirmation
   const handleDeleteTask = async (task: Task) => {
      if (taskEdit.editingId === task.id) return
      if (!task.id) return
      const confirmDelete = confirm(`Vil du slette opgaven: "${task.name}"?`)
      if (confirmDelete) {
         await db.tasks.delete(task.id)
         const updatedTasks = await db.tasks.toArray()
         setTasks(getTasksForDate(updatedTasks, date))
      }
   }

   // ----------- REMINDERS ---------------
   // Delete a reminder with confirmation
   const handleDeleteReminder = async (reminder: Reminder) => {
      if (!reminder.id) return
      const confirmDelete = confirm(`Vil du slette reminder: "${reminder.name}"?`)
      if (confirmDelete) {
         await db.reminders.delete(reminder.id)
         const updatedReminders = await db.reminders.toArray()
         setReminders(getRemindersForDate(updatedReminders, date))
      }
   }


   // -------- USEEFFECT HOOK ---------
   useEffect(() => {
      // Render Effect
      const fetch = async () => {
         const allTasks = await db.tasks.toArray()
         const allReminders = await db.reminders.toArray()

         setTasks(getTasksForDate(allTasks, date))
         setReminders(getRemindersForDate(allReminders, date))
      }
      fetch()
   }, [date])

   // ----------- RETURN ---------------
   return (
      <>
         <div
            className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4"
            onClick={onClose}
         >
            <div
               className="relative bg-white rounded-xl p-6 w-full max-w-lg shadow-lg"
               onClick={e => e.stopPropagation()}
            >
               {/* Luk-knap (øverst) */}
               <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                  onClick={onClose}
               >
                  ✕
               </button>

               {/* Overskrift */}
               <h3 className="text-xl font-bold mb-4 text-center">
                  Dagsoversigt for {formatISO(date, { representation: "date" })}
               </h3>

               {/* Tasks */}
               <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Opgaver</h4>
                  <ul className="space-y-2">
                     {tasks.map(task => (
                        <li
                           key={task.id}
                           className="bg-white rounded p-2 shadow border border-gray-200"
                        >
                           {taskEdit.editingId === task.id ? (
                              <div className="space-y-2">
                                 <input
                                    type="text"
                                    value={taskEdit.editForm.name}
                                    onChange={e => taskEdit.setEditForm({ ...taskEdit.editForm, name: e.target.value })}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="Navn"
                                 />
                                 <input
                                    type="text"
                                    value={taskEdit.editForm.area}
                                    onChange={e => taskEdit.setEditForm({ ...taskEdit.editForm, area: e.target.value })}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="Område"
                                 />
                                 <div className="flex gap-2 justify-end">
                                    <button
                                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                       onClick={() =>
                                          taskEdit.saveEdit(db.tasks, setTasks, getTasksForDate, date)
                                        }
                                    >
                                       Gem
                                    </button>
                                    <button
                                       className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                       onClick={taskEdit.cancelEdit}
                                    >
                                       Annullér
                                    </button>
                                 </div>
                              </div>
                           ) : (
                              <div className="flex justify-between items-center">
                                 <div>
                                    <div className="font-medium">{task.name}</div>
                                    <div className="text-sm text-gray-600">({task.area})</div>
                                 </div>
                                 <div className="flex gap-2 text-sm">
                                    <button
                                       className="text-blue-600 hover:underline"
                                       onClick={() =>
                                          taskEdit.startEdit(task.id!, { name: task.name, area: task.area }, "task")
                                       }

                                    >
                                       Redigér
                                    </button>
                                    <button
                                       className="text-red-600 hover:underline"
                                       onClick={() => handleDeleteTask(task)}
                                    >
                                       Slet
                                    </button>
                                 </div>
                              </div>
                           )}
                        </li>
                     ))}
                  </ul>
               </div>


               {/* Reminders */}
               <div>
                  <h4 className="text-lg font-semibold mb-2">Reminders</h4>
                  {reminders.length === 0 ? (
                     <p className="text-gray-500">Fandt ingen reminders..</p>
                  ) : (
                     <ul className="space-y-2">
                        {reminders.map(reminder => (
                           <li
                              key={reminder.id}
                              className="bg-yellow-100 rounded p-2 shadow border border-yellow-200"
                           >
                              {reminderEdit.editingId === reminder.id ? (
                                 <div className="space-y-2">
                                    <input
                                       type="text"
                                       value={reminderEdit.editForm.name}
                                       onChange={e =>
                                          reminderEdit.setEditForm({ ...reminderEdit.editForm, name: e.target.value })
                                       }
                                       className="w-full border px-2 py-1 rounded"
                                       placeholder="Navn"
                                    />
                                    <input
                                       type="text"
                                       value={reminderEdit.editForm.note}
                                       onChange={e =>
                                          reminderEdit.setEditForm({ ...reminderEdit.editForm, note: e.target.value })
                                       }
                                       className="w-full border px-2 py-1 rounded"
                                       placeholder="Note"
                                    />
                                    <input
                                       type="time"
                                       value={reminderEdit.editForm.time}
                                       onChange={e =>
                                          reminderEdit.setEditForm({ ...reminderEdit.editForm, time: e.target.value })
                                       }
                                       className="w-full border px-2 py-1 rounded"
                                    />
                                    <div className="flex gap-2 justify-end">
                                       <button
                                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                          onClick={() => reminderEdit.saveEdit(db.reminders, setReminders, getRemindersForDate, date)}
                                       >
                                          Gem
                                       </button>
                                       <button
                                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                          onClick={() => reminderEdit.cancelEdit}
                                       >
                                          Annullér
                                       </button>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="flex justify-between items-center">
                                    <div>
                                       <div className="font-medium">{reminder.name}</div>
                                       <div className="text-sm text-gray-700">
                                          {reminder.note} kl. {reminder.time}
                                       </div>
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                       <button
                                          className="text-blue-600 hover:underline"
                                          onClick={() =>
                                             reminderEdit.startEdit(reminder.id!, {
                                               name: reminder.name,
                                               note: reminder.note,
                                               time: reminder.time,
                                             }, "reminder")
                                           }
                                       >
                                          Redigér
                                       </button>
                                       <button
                                          className="text-red-600 hover:underline"
                                          onClick={() => handleDeleteReminder(reminder)}
                                       >
                                          Slet
                                       </button>
                                    </div>
                                 </div>
                              )}
                           </li>
                        ))}
                     </ul>

                  )}
               </div>

               {/* Luk-knap i bunden */}
               <button
                  className="mt-6 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded"
                  onClick={onClose}
               >
                  Luk
               </button>
            </div>
         </div>
      </>
   )
}
