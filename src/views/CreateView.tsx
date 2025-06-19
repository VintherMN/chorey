// Imports
import { Link } from "react-router-dom"

// Functions
const CreateView = () => {
    return(
        <>
        <div className="p-4 text-center max-w-md mx-auto">
            <div className="space-y-4">
                <Link to="/create/task" className="block bg-blue-500 text-white py-3 rounded shadow hover:bg-blue-600">
                    Ny Opgave
                </Link>
                <Link to="/create/reminder" className="block bg-green-500 text-white py-3 rounded shadow hover:bg-green-600">
                    Ny Reminder
                </Link>
            </div>
        </div>
        </>
    )
}

// Exports
export default CreateView
