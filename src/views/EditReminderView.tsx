// Imports
// React
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
// DB
import { db } from "../db"
import type { Reminder } from "../db"
// Components
import ReminderForm from "../components/forms/ReminderForm"

const EditReminderView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [reminder, setReminder] = useState<Reminder | null>(null)

  useEffect(() => {
    const fetchReminder = async () => {
      if (!id) return
      const numericId = Number(id)
      if (isNaN(numericId)) return

      const doc = await db.reminders.get(numericId)
      if (doc) setReminder(doc)
    }

    fetchReminder()
  }, [id])

  const handleSubmit = async (
    updatedReminder: Omit<Reminder, "id">
  ) => {
    if (!id || !reminder) return
    const numericId = Number(id)
    if (isNaN(numericId)) return

    await db.reminders.put({
      ...updatedReminder,
      id: numericId,
      completedToday: reminder.completedToday ?? false,
    })

    navigate(-1)
  }

  if (!reminder) return <p>Indlæser reminder...</p>

  return (
    <div className="p-4">
      <ReminderForm
        initialData={reminder}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  )
}

export default EditReminderView
