// Imports
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { db, type Task, type Reminder } from "../db"

// Functions
const EditView = () => {
  const { type, id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState<Task | null>(null)
  const [reminder, setReminder] = useState<Reminder | null>(null)

  // Renderer
  useEffect(() => {
    const load = async () => {
      if (type === "task") {
        const result = await db.tasks.get(Number(id))
        if (result) setTask(result)
      } else if (type === "reminder") {
        const result = await db.reminders.get(Number(id))
        if (result) setReminder(result)
      }
    }
    load()
  }, [type, id])

  // Savee and update task
  const saveTask = async () => {
    if (!task?.id) return
    await db.tasks.update(task.id, {
      name: task.name.trim(),
      area: task.area.trim(),
    })
    navigate("/manage")
  }

  // Save and update reminder
  const saveReminder = async () => {
    if (!reminder?.id) return
    await db.reminders.update(reminder.id, {
      name: reminder.name.trim(),
      note: reminder.note.trim(),
      time: reminder.time,
    })
    navigate("/manage")
  }

  // Conditionally choose between either task or reminder for edit view
  // Renders the edit task view
  if (type === "task" && task) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <label className="block mb-2">Navn</label>
        <input
          value={task.name}
          onChange={e => setTask({ ...task, name: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <label className="block mb-2">Område</label>
        <input
          value={task.area}
          onChange={e => setTask({ ...task, area: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <button
          onClick={saveTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Gem ændringer
        </button>
      </div>
    )
  }

  // Renders the edit reminder view
  if (type === "reminder" && reminder) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <label className="block mb-2">Navn</label>
        <input
          value={reminder.name}
          onChange={e => setReminder({ ...reminder, name: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <label className="block mb-2">Note</label>
        <input
          value={reminder.note}
          onChange={e => setReminder({ ...reminder, note: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <label className="block mb-2">Tidspunkt</label>
        <input
          type="time"
          value={reminder.time}
          onChange={e => setReminder({ ...reminder, time: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <button
          onClick={saveReminder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Gem ændringer
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <p className="text-gray-500">Indlæser eller ugyldig type...</p>
    </div>
  )
}

// Export
export default EditView
