// imports
import { useState } from "react"
import { Calendar } from "../components/Calendar"
import { OverviewForDate } from "../components/OverviewForDate"


// Functions
const CalendarView = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    return (
        <div className="p-4 max-w-md mx-auto">
            <Calendar onDateSelect={setSelectedDate} />
            {selectedDate && (
                <OverviewForDate 
                date={selectedDate}
                onClose={() => setSelectedDate(null)} />
            )}
        </div>
    )
}

// Exports
export default CalendarView