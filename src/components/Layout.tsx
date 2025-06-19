// Imports -----------------------------------

// React
import { Outlet } from "react-router-dom"

// Components
import { BurgerMenu } from "./BurgerMenu"

// Utility

// End of Imports -----------------------------

// Main Layout function -----------------------
const Layout = () => {
   // Change and add Route titles in utils/constants.ts
   // Helper function - found in utils/helpers.ts

   return (
      <div className="min-h-screen bg-gray-100">
         <BurgerMenu />
         <div className="pt-12 px-4 max-w-md mx-auto">
            <Outlet />
         </div>
      </div>
   )
}

// Export ------------------------------------
export default Layout
