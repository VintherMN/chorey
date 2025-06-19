// Imports
import type { Task } from "../db"
import { db } from "../db"
import { todayISO } from "../utils/constants"

// Functions
export const TaskList = ({
    tasks,
    onToggle,
  } : {
    tasks: Task[]
    onToggle: (task: Task) => void
  }) => {


    const handlePostpone = async (task: Task) => {
        if (!task.id) return

        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        const tomorrowISO = tomorrow.toISOString().split("T")[0]

        await db.tasks.update(task.id, {
            postponedUntill: tomorrowISO,
        })
    }


    return (
    <>
    <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2"> Opgaver i dag</h2>
        {tasks.length === 0 ? (
            <p className="text-gray-500">Ingen opgaver endnu.</p>
        ) : (
            <ul className="space-y-2">
                {tasks.map(task => {
                const isPostponed = task.postponedUntill === todayISO

                return (
                    <li 
                    key={task.id} 
                    className={`flex items-center justify-between bg-white rounded p-3 shadow border-1-4 
                    ${isPostponed ? "border-red-500 bg-red-50" : "border-transparent"}
                    ${task.completed ? "opacity-50" : ""}`}>
                        <div>
                            <span className="font-medium">{task.name}</span>
                            <span className="text-sm text-gray-600"> ({task.area})</span>
                            {isPostponed && (
                                <div className="text-xs text-red-600 mt-1">Udskudt opgave</div>
                            )}
                        </div>
                        <input 
                        type="checkbox" 
                        checked={task.completed ?? false}
                        onChange={() => onToggle(task)}
                        className="w-4 h-4" />
                        <button
                            onClick={() => handlePostpone(task)}
                            className="text-xs text-blue-600 hover:underline"
                        >
                            Udskyd
                        </button>
                    </li>
                )})}
            </ul>
        )}
    </div>    
    </>
    )
}