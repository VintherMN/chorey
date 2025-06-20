// Imports
import { db } from "../db"
import { formatISO } from "date-fns"
import { todayISO as keyForToday } from "./constants"


// Functions
export const showDailyNotification = async () => {
    // Consent Check
    const allowed = JSON.parse(
        localStorage.getItem("notificationsAllowed")
        ?? "true")
    if (!allowed) return

    // Avoid repeating notifications
    if (localStorage.getItem("notifiedFor") === keyForToday) return
    localStorage.setItem("notifiedFor", keyForToday)

    // Check for permission to send notifications
    if (Notification.permission !== "granted") return

    // This could probably be worked into the todayISO in constants..
    const todayISO = formatISO(new Date(), { representation: "date" })

    const postponedTasks = await db.tasks
        .where("postponedUntill")
        .equals(todayISO)
        .toArray()

    const unmarkedTasks = await db.tasks
        .filter(task => !task.postponedUntill)
        .toArray()

    const tasks = [...postponedTasks, ...unmarkedTasks]

    const reminders = await db.reminders.toArray()
    const todayWeekday = new Date().getDay() || 7
    const todayReminders = reminders.filter(remindere => remindere.daysOfWeek.includes(todayWeekday))


    const items = [
        ...tasks.map(task => task.name),
        ...todayReminders.map(reminder => `${reminder.name} (${reminder.time})`)
    ]

    if (items.length === 0) return

    new Notification("Chorey - Dagens Påmindelse", {
        body: "Husk: \n" + items.join("\n"),
        silent: false
    })
}

// Notification for showing forgotten tasks of the day, at a later point.
export const showPendingTasksNotification = async () => {
    // Consent check
    const allowed = JSON.parse(
        localStorage.getItem("notificationsAllowed")
        ?? "true")
    if (!allowed) return

    // Permission check
    if (Notification.permission !== "granted") return

    // Prevents multiple/further popups if and when user loads app past 20:00 
    if (localStorage.getItem("pendingNotifiedFor") === keyForToday) return
    localStorage.setItem("pendingNotifiedFor", keyForToday)

    const todayISO = formatISO(new Date(), { representation: "date" })

    const tasks = await db.tasks
        .filter(task =>
            (!task.completed && (!task.postponedUntill || task.postponedUntill === todayISO))
        )
        .toArray()

    if (tasks.length === 0) return

    const taskList = tasks.map(task => `- ${task.name}`).join("\n")

    new Notification("Du mangler stadig:", {
        body: `${taskList}\n\nTryk for at udskyde til i morgen\nHusk (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        requireInteraction: true
    }).onclick = () => {
        window.open(`${window.location.origin}/defer`, "_blank")
    }
}