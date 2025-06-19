// Imports
import { useEffect, useState } from "react"
// import { db } from "../../db"
import { weekdays } from "../../utils/constants"
import type { TaskFormProps } from "../../types/forms"
import { toggleItemInArray as toggleDay } from "../../utils/helpers"

// Functions
const TaskForm = ({mode, initialData, onSubmit}: TaskFormProps) => {
  const [name, setName] = useState(initialData?.name ?? "")
  const [area, setArea] = useState(initialData?.area ?? "")
  const [evenWeeks, setEvenWeeks] = useState(initialData?.evenWeeks ?? true)
  const [oddWeeks, setOddWeeks] = useState(initialData?.oddWeeks ?? true)
  const [selectedDays, setSelectedDays] = useState<number[]>(initialData?.daysOfWeek ?? [])
  const [interval, setInterval] = useState<number | null>(initialData?.intervalDays ?? null)


  // Toggles the chosen weekday: removes it if selected, adds it if not.
  const handleToggleDay = (chosenDay: number) => {
    setSelectedDays(prev => toggleDay(prev, chosenDay))
  }

  // Handles submit in task object, saves in local storage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit?.({
      name,
      area,
      evenWeeks,
      oddWeeks,
      daysOfWeek: interval ? [] : selectedDays,
      intervalDays: interval ?? null,
    })
  }

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "")
      setArea(initialData.area ?? "")
      // osv.
    }
  }, [initialData])

  // Form for submission
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Navn på opgave</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Område i huset</label>
        <input
          type="text"
          value={area}
          onChange={e => setArea(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Gentagelse</label>

        <div className="flex items-center space-x-4 mb-2">
          <label>
            <input
              type="checkbox"
              checked={evenWeeks}
              onChange={e => setEvenWeeks(e.target.checked)}
              className="mr-1"
            />
            Lige uger
          </label>
          <label>
            <input
              type="checkbox"
              checked={oddWeeks}
              onChange={e => setOddWeeks(e.target.checked)}
              className="mr-1"
            />
            Ulige uger
          </label>
        </div>

        <div className="mb-2">
          <span className="block mb-1">Dage i ugen</span>
          <div className="flex flex-wrap gap-2">
            {weekdays.map(day => (
              <label key={day.value} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day.value)}
                  onChange={() => handleToggleDay(day.value)}
                />
                <span>{day.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1">Eller: Gentag hver X dag</label>
          <input
            type="number"
            min={1}
            placeholder="F.eks. 3"
            value={interval ?? ""}
            onChange={e =>
              setInterval(e.target.value ? parseInt(e.target.value) : null)
            }
            className="w-32 border p-2 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {mode === "edit" ? "Gem ændringer" : "Opret opgave"}
      </button>
    </form>
  )
}

// Exports
export default TaskForm
