// Imports
import { useEffect, useState } from "react"
import { weekdays } from "../../utils/constants"
import {toggleItemInArray as toggleDay } from "../../utils/helpers"
import type { ReminderFormProps } from "../../types/forms"


// Functions
const ReminderForm = ({ initialData, onSubmit, mode}: ReminderFormProps) => {
  const [name, setName] = useState(initialData?.name ?? "")
  const [note, setNote] = useState(initialData?.note ?? "")
  const [selectedDays, setSelectedDays] = useState<number[]>(initialData?.daysOfWeek ?? [])
  const [time, setTime] = useState(initialData?.time ?? "08:00")

  // Rendererer
  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "")
      setNote(initialData.note ?? "")
      setSelectedDays(initialData.daysOfWeek ?? [])
      setTime(initialData.time ?? "08:00")
    }
  }, [initialData])

  // Toggles the chosen weekday: removes it if selected, adds it if not.
  const handleToggleDay = (chosenDay: number) => {
    setSelectedDays(prev => toggleDay(prev, chosenDay))
  }
  
  // Handles submit, generic values can be seen in helper.ts
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit?.({
      name,
      note,
      daysOfWeek: selectedDays,
      time,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Navn</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Note</label>
        <input
          type="text"
          value={note}
          maxLength={30}
          onChange={e => setNote(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <span className="block mb-1 font-medium">Ugedage</span>
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

      <div>
        <label className="block mb-1 font-medium">Tidspunkt</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {mode === "edit" ? "Gem ændringer" : "Opret reminder"}
      </button>
    </form>
  )
  }
  

  // Exports
  export default ReminderForm
  