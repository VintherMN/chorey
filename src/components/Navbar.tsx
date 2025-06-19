// // Imports
// import { Link, useLocation } from "react-router-dom"


// // Functions
// const navItems = [
//   { to: "/", label: "Forside" },
//   { to: "/create", label: "Opret" },
//   { to: "/calendar", label: "Kalender" },
//   { to: "/settings", label: "Indstillinger" },
//   { to: "/manage", label: "Oversigt" },
// ]

// const Navbar = () => {
//   const location = useLocation()

//   return (
//     <nav className="bg-white shadow sticky top-0 z-10">
//       <div className="flex justify-around p-3 text-sm font-medium">
//         {navItems.map(item => (
//           <Link
//             key={item.to}
//             to={item.to}
//             className={`px-2 py-1 rounded ${
//               location.pathname === item.to ? "bg-blue-200 text-blue-800" : "text-gray-700"
//             }`}
//           >
//             {item.label}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   )
// }


// // Exports
// export default Navbar
