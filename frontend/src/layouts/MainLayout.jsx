import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function MainLayout({ children }) {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-[250px] w-full">

        <Navbar />

        <div className="p-10">

          {children}

        </div>

      </div>

    </div>
  )
}

export default MainLayout