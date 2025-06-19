import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getRouteTitle } from "../utils/helpers"

export const BurgerMenu = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const title = getRouteTitle(location.pathname)
  const navigate = useNavigate()

  const isHome = location.pathname === "/"

  return (
    <>
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-white shadow z-50 px-4">
        <div className="flex items-center h-full relative">
          {/* back button (left) */}
          {!isHome ? (
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-black"
            >
              ← Tilbage
            </button>
          ) : (
            <div className="w-[60px]"></div> // Empty for space
          )}

          {/* Titel (center) */}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
            {title}
          </h1>

          {/* Burger icon (right side) */}
          <button onClick={() => setOpen(true)} className="ml-auto space-y-1">
            <span className="block w-6 h-0.5 bg-gray-800 rounded"></span>
            <span className="block w-6 h-0.5 bg-gray-800 rounded"></span>
            <span className="block w-6 h-0.5 bg-gray-800 rounded"></span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 space-y-4">
          <button
            className="text-right text-gray-600 text-sm mb-4"
            onClick={() => setOpen(false)}
          >
            ✕ Luk
          </button>

          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Forside
            </Link>
            <Link
              to="/create"
              className="text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Opret
            </Link>
            <Link
              to="/calendar"
              className="text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Kalender
            </Link>
            <Link
              to="/manage"
              className="text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Opgaver & Reminders
            </Link>
            <Link
              to="/settings"
              className="text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Indstillinger
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
