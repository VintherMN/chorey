// Imports
import type { Table } from "dexie"
import { isSameDay, parseISO } from "date-fns"
import type { Task, Reminder } from "../db"
import { routeTitles } from "./constants"

// Helper functions - DRY

// Generic toggle function
export const toggleItemInArray = <T>(array: T[], item: T): T[] => {
    return array.includes(item)
        ? array.filter(currentItem => currentItem !== item)
        : [...array, item]
}

// Generic function to save submits in db
export const saveToDatabase = async <T>(
    table: Table<T, number>,
    data: T,
    successMessage = "Data saved in db."
) => {
    await table.add(data)
    alert(successMessage)
}

// Gets all tasks for the day
export const getTasksForDate = (tasks: Task[], target: Date): Task[] => {
    return tasks.filter(task => {
        if (task.postponedUntill) {
            return isSameDay(parseISO(task.postponedUntill), target)
        }

        const weekday = target.getDay() === 0 ? 7 : target.getDay()
        return task.daysOfWeek?.includes(weekday)
    })
}

// Get all reminders for the day
export const getRemindersForDate = (reminders: Reminder[], target: Date): Reminder[] => {
    const weekday = target.getDay() === 0 ? 7 : target.getDay()
    return reminders.filter(reminder => reminder.daysOfWeek.includes(weekday))
}

// Helper function to find a routetitle match
export const getRouteTitle = (pathname: string): string => {
    const match = Object.keys(routeTitles)
        .sort((a, b) => b.length - a.length)
        .find(route => pathname.startsWith(route))

    return routeTitles[match || ""] || "Chorey"
}