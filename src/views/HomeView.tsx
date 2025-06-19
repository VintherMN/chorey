// Imports
// React
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// Components
import { TaskList } from "../components/TaskList"
import { ReminderList } from "../components/ReminderList"
// DB and Props
import { db, type Task, type Reminder } from "../db"
// Utils
import { todayISO } from "../utils/constants"
import { showDailyNotification } from "../utils/notifications"


// Functions
const HomeView = () => {
  // Navigation
  const navigate = useNavigate()
  // Use State Hooks
  const [tasks, setTasks] = useState<Task[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])

  // Done checks
  const allTasksDone = tasks.length > 0 && tasks.every(t => t.completed)
  const allRemindersDone = reminders.length > 0 && reminders.every(r => r.completedToday)
  const everythingDone = allTasksDone && allRemindersDone
  const hasTasksOrReminders = tasks.length > 0 || reminders.length > 0

  // Toggles and check reminder
  const handleToggleReminder = async (reminder: Reminder) => {
    if (!reminder.id) return
    await db.reminders.update(reminder.id, {
      completedToday: !(reminder.completedToday ?? false),
    })

    refreshToday()
  }

  // Toggles and checks Tasks
  const handleToggleTask = async (task: Task) => {
    if (!task.id) return
    await db.tasks.update(task.id, {
      completed: !(task.completed ?? false),
    })

    refreshToday()
  }

  // Refresh everything for the day
  const refreshToday = async () => {
    const allTasks = await db.tasks.toArray()
    const todayTasks = allTasks.filter(task =>
      !task.postponedUntill || task.postponedUntill === todayISO
    )
    const allReminders = await db.reminders.toArray()

    setTasks(todayTasks)
    setReminders(allReminders)
  }

  // Runs when rendering or at init
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission()
    }

    refreshToday()
  }, [])

  // View
  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        {everythingDone && hasTasksOrReminders && (
          <div className="bg-green-100 border-1-4 border-green-500 text-green-800 p-3 mb-4 rounded">
            Du er færdig for i dag! - Godt gået!
          </div>
        )}

        {/* Opgaver overskrift + knap */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Opgaver</h2>
          <button
            onClick={() => navigate("/create/task")}
            className="w-8 h-8 bg-blue-500 text-white rounded-full text-center text-lg leading-6 hover:bg-blue-600"
            aria-label="Tilføj opgave"
          >
            +
          </button>
        </div>
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
        />

        {/* Reminders overskrift + knap */}
        <div className="flex items-center justify-between mt-6 mb-2">
          <h2 className="text-lg font-semibold">Reminders</h2>
          <button
            onClick={() => navigate("/create/reminder")}
            className="w-8 h-8 bg-green-500 text-white rounded-full text-center text-lg leading-6 hover:bg-green-600"
            aria-label="Tilføj reminder"
          >
            +
          </button>
        </div>
        <ReminderList
          reminders={reminders}
          onToggle={handleToggleReminder}
        />
      </div>

      <div>
        <button
          onClick={showDailyNotification}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
        >
          Test notifikation
        </button>
      </div>
    </>
  )
}

// Exports
export default HomeView
