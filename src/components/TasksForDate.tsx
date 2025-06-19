// Imports
import { useEffect, useState } from "react"
import { db, type Task } from "../db"
import { formatISO } from "date-fns"


// Functions
export const TasksForDate = ({ date } : { date: Date }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const fetch = async () => {
            const all = await db.tasks.toArray()
            const iso = formatISO(date, { representation: "date" })
            const filtered = all.filter(anyTask => anyTask.postponedUntill === iso)
            setTasks(filtered)
        }

        fetch()
    }, [date])

    return (
        <>
        <div className="space-y-1">
            <h3 className="text-lg font-bold">
                Opgaver for {formatISO(date, { representation: "date" })}
            </h3>
            {tasks.length === 0 ? (
                <p className="text-gray-500">
                    Fandt ingen opgaver.
                </p>
            ) : (
                <ul className="space-y-1">
                    {tasks.map(task => (
                        <li
                        key={task.id}
                        className="bg-white rounded p-2 shadow">
                            {task.name} ({task.area})
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    )
}