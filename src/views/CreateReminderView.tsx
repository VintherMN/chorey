// Imports
// Components
import ReminderForm from "../components/forms/ReminderForm"
// React navigation
import { useNavigate } from "react-router-dom"
// Props
import type { Reminder } from "../db"
// DB (Dexie)
import { db } from "../db"


// Functions
const CreateReminderView = () => {
  const navigate = useNavigate()

  const handleSubmit = async (
    reminderData: Omit<Reminder, "id" | "completedToday">
  ) => {
    await db.reminders.add({
      ...reminderData,
      completedToday: false,
    })
    navigate("/")
  }

  return (
    <div>
      <ReminderForm
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  )
}

// Export
export default CreateReminderView
