import { Link } from "react-router-dom"

function Sidebar() {

  return (

    <div className="w-[250px] h-screen bg-black text-white fixed left-0 top-0 p-6">

      <h1 className="text-2xl font-bold mb-10">
        Team Task Manager
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-gray-800 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="hover:bg-gray-800 p-3 rounded"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="hover:bg-gray-800 p-3 rounded"
        >
          Tasks
        </Link>

      </div>

    </div>
  )
}

export default Sidebar