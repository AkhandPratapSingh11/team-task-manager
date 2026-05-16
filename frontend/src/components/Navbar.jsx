import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

function Navbar() {

  const navigate = useNavigate()

  const { logout } = useContext(AuthContext)

  const handleLogout = () => {

    logout()

    navigate("/")
  }

  return (

    <div className="h-[70px] bg-white shadow flex items-center justify-end px-10">

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded"
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar