// Imports

import { useEffect, useState } from "react"
import { db, type Task } from "../db"
import { useNavigate } from "react-router-dom"
import { formatISO } from "date-fns"



// Functions
const DeferView = () => {
    const [pendingTasks, setPendingTasks] = useState<Task[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            const todayISO = formatISO(new Date(), { representation: "date" })
            const tasks = await db.tasks
                .filter(task => 
                    !task.completed 
                    && (!task.postponedUntill 
                    || task.postponedUntill === todayISO)
                )
                .toArray()
            setPendingTasks(tasks)
        }
        fetch()
    }, [])

    const handleDefer = async () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const tomorrowISO = formatISO(tomorrow, { representation: "date" })

        await Promise.all(
            pendingTasks.map(task => 
                task.id ? db.tasks.update(task.id, { postponedUntill: tomorrowISO }) : null
            )
        )

        navigate("/")
    }

    return(
        <>
        <div className="p-4 max-w-md mx-auto">
        	{pendingTasks.length === 0 ? (
                <p className="text-gray-500">
                    Ingen uafsluttede optager i dag! Godt arbejde!
                </p>
            ) : (
            <>
                <ul className="space-y-2 mb-4">
                    {pendingTasks.map(task => (
                        <li 
                        key={task.id}
                        className="bg-white p-2 rounded shadow">
                            {task.name} ({task.area})
                        </li>
                    ))}
                </ul>

                <button
                onClick={handleDefer}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Udskyd
                </button>
            </>
            )}
        </div>
        </>
    )
}

export default DeferView