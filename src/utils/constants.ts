

// weekdays constant
export const weekdays = [
{ label: "Man", value: 1 },
  { label: "Tir", value: 2 },
  { label: "Ons", value: 3 },
  { label: "Tor", value: 4 },
  { label: "Fre", value: 5 },
  { label: "Lør", value: 6 },
  { label: "Søn", value: 7 },
]

// Get ISO time
export const todayISO = new Date().toISOString().split("T")[0]

// Route titles
export const routeTitles: Record<string, string> = {
   "/": "Dagens overblik",
   "/calendar": "Kalender",
   "/create": "Opret",
   "/create/task": "Ny opgave",
   "/create/reminder": "Ny reminder",
   "/edit/task": "Rediger opgave",
   "/edit/reminder": "Rediger reminder",
   "/manage": "Administrer",
   "/settings": "Indstillinger",
   "/defer": "Udskyd opgaver",
}