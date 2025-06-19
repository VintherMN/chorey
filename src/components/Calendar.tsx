// Imports
import { format, startOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, endOfMonth } from "date-fns"

// NOTE: Anvend useState og sæt currDate/setCurrDate statehook hvis det skal være muligt at bladre i kalenderen mellem måneder.

// Functions
export const Calendar = ({ onDateSelect } : { onDateSelect: (date: Date) => void }) => {
    const currDate = new Date()
    const monthStart = startOfMonth(currDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const dateMatrix = []
    let day = startDate
    while (day <= endDate) {
        const week = []
        for (let i = 0; i < 7; i++) {
            week.push(day)
            day = addDays(day, 1)
        }
        dateMatrix.push(week)
    }

    const today = new Date()

    return (
        <>
        <div className="space-y-4">
            <h2 className="text-center text-xl font-semibold">
                {format(currDate, "MMMM yyyyy")}
            </h2>
            <div className="grid grid-cols-7 gap-2 teext-center text-sm font-medium">
                {["Man", "Tirs", "Ons", "Tors", "Fre", "Lør", "Søn"].map(dayOfWeek => (
                    <div
                    key={dayOfWeek}
                    className="text-gray-600"
                    >
                        {dayOfWeek}
                    </div>
                ))}
                {dateMatrix.flat().map(date => {
                    const isToday = isSameDay(date, today)
                    return (
                        <button
                        key={date.toISOString()}
                        onClick={() => onDateSelect(date)}
                        className={`p-2 rounded ${
                            isToday ? "bg-blue-100" : "hover:bg-gray-200"
                        }`}
                        >
                            {date.getDate()}
                        </button>
                    )
                })}
            </div>
        </div>
        </>
    )
}