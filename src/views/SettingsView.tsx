// Imports
import { useEffect, useState } from "react"
import { db } from "../db"


// Functions
const SettingsView = () => {
  // Spliting weekdays and weekends
  // Weekday DND timeslot
  const [weekdayMuteFrom, setWeekdayMuteFrom] = useState("22:00")
  const [weekdayMuteTo, setWeekdayMuteTo] = useState("07:00")

  // Weekend DND timeslot
  const [weekendMuteFrom, setWeekendMuteFrom] = useState("22:00")
  const [weekendMuteTo, setWeekendMuteTo] = useState("07:00")

  // Consent states at startup
  const [notificationsAllowed, setNotificationsAllowed] = useState(() => {
    const stored = localStorage.getItem("notificationsAlllowed")
    return stored ? JSON.parse(stored) : true
  })

  // Storage check - useEffect for Init
  useEffect(() => {
    // Storage variables
    const storedWeekday = localStorage.getItem("muteWeekday")
    const storedWeekend = localStorage.getItem("muteWeekend")

    // Conditions for weekday/weekend
    if (storedWeekday) {
      const { from, to } = JSON.parse(storedWeekday)
      setWeekdayMuteFrom(from)
      setWeekdayMuteTo(to)
    }

    if (storedWeekend) {
      const { from, to } = JSON.parse(storedWeekend)
      setWeekendMuteFrom(from)
      setWeekendMuteTo(to)
    }
  }, [])

  // Notifications check - useEffect for persistence
  useEffect(() => {
    // Notifications consent variables
    localStorage.setItem("notificationsAllowed", JSON.stringify(notificationsAllowed))
  }, [notificationsAllowed])

  const handleClearCompleted = async () => {
    const confirmed = confirm("Er du sikker på, at du vil slette alle færdige opgaver?")
    if (!confirmed) return

    await db.tasks
      .where("completed")
      .equals(true as any)
      .delete()

    alert("Færdige opgaver er nu slettet.")
  }

  // Save Settings
  const handleSaveSettings = () => {
    localStorage.setItem(
      "muteWeekday",
      JSON.stringify({ from: weekdayMuteFrom, to: weekdayMuteTo })
    )
    localStorage.setItem(
      "muteWeekend",
      JSON.stringify({ from: weekendMuteFrom, to: weekendMuteTo })
    )
    alert("Indstillinger gemt!")
  }

  return (
    <>
      <div className="space-y-4 p-4">
        <div>
          <label className="block font-medium mb-1">Hverdage: lydløs fra...</label>
          <input type="time" value={weekdayMuteFrom} onChange={e => setWeekdayMuteFrom(e.target.value)} className="border p-1 rounded" />
          <span className="mx-2">til..</span>
          <input type="time" value={weekdayMuteTo} onChange={e => setWeekdayMuteTo(e.target.value)} className="border p-1 rounded" />
        </div>

        <div>
          <label className="block font-medium mb-1">Weekend: lydløs fra...</label>
          <input type="time" value={weekendMuteFrom} onChange={e => setWeekendMuteFrom(e.target.value)} className="border p-1 rounded" />
          <span className="mx-2">til...</span>
          <input type="time" value={weekendMuteTo} onChange={e => setWeekendMuteTo(e.target.value)} className="border p-1 rounded" />
        </div>
        <button
          onClick={handleClearCompleted}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Ryd færdige opgaver
        </button>

      </div>
      <div className="mt-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationsAllowed}
            onChange={e => setNotificationsAllowed(e.target.checked)}
          />
          Tillad notifikationer
        </label>
      </div>
      <button
        onClick={handleSaveSettings}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Gem ændringer
      </button>
    </>
  )
}


// Exports
export default SettingsView
