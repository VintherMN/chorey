// Imports
import {type Reminder } from "../db"

// Functions
export const ReminderList = ({ 
  reminders,
  onToggle,
} : { 
  reminders: Reminder[] 
  onToggle: (reminder: Reminder) => void
}) => {
  
  return (
    <>
    <div>
      <h2 className="text-xl font-semibold mb-2">Daglige påmindelser</h2>
      <ul className="space-y-2">
        {reminders.map(reminder => (
          <li 
          key={reminder.id} 
          className={
            `bg-yellow-100 rounded p-3 shadow 
            ${reminder.completedToday 
            ? "opacity-60 line-through" 
            : ""
            }`
          }>
            <strong>{reminder.name}</strong>: {reminder.note}
            <input 
            type="checkbox"
            checked={reminder.completedToday ?? false}
            onChange={() => onToggle(reminder)}
            />
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}
