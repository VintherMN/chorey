// Imports
// React stuff
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

// Views
import HomeView from "./views/HomeView"
import CreateView from "./views/CreateView"
import CalendarView from "./views/CalendarView"
import SettingsView from "./views/SettingsView"
import CreateTaskView from "./views/CreateTaskView"
import CreateReminderView from "./views/CreateReminderView"
import DeferView from "./views/DeferView"
import ManageView from "./views/ManageView"
import EditView from "./views/EditView"
import EditTaskView from "./views/EditTaskView"
import EditReminderView from "./views/EditReminderView"

// Utilities and Components
import { showDailyNotification, showPendingTasksNotification } from "./utils/notifications"
import Layout from "./components/Layout"

// App stylesheet import
import './App.css'

// Main App Function
function App() {
  useEffect(() => {
    showDailyNotification()
    const now = new Date()
    const currHour = now.getHours()
    const hourlyNotificationInterval = setInterval(showDailyNotification, 1000 * 60 * 60) // Once an hour

    if (currHour >= 20) {
      showPendingTasksNotification()
    }

    return () => clearInterval(hourlyNotificationInterval)
  }, [])

  return (
    <BrowserRouter>  
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/create" element={<CreateView />} />
            <Route path="/create/task" element={<CreateTaskView />} />
            <Route path="/create/reminder" element={<CreateReminderView />} />
            <Route path="/manage" element={<ManageView />} />
            <Route path="/edit/:type/:id" element={<EditView />} />
            <Route path="/edit/task/:id" element={<EditTaskView />} />
            <Route path="/edit/reminder/:id" element={<EditReminderView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/defer" element={<DeferView />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

// Export
export default App
