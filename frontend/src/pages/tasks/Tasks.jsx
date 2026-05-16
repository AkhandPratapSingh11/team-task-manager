import { useEffect, useState } from "react"

import axiosInstance from "../../api/axios"

import MainLayout from "../../layouts/MainLayout"

function Tasks() {

  const [tasks, setTasks] = useState([])

  const [projects, setProjects] = useState([])

  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    due_date: "",
    project: "",
  })


  useEffect(() => {

    fetchTasks()

    fetchProjects()

  }, [])


  const fetchTasks = async () => {

    try {

      const response = await axiosInstance.get(
        "/tasks/"
      )

      setTasks(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }


  const fetchProjects = async () => {

    try {

      const response = await axiosInstance.get(
        "/projects/"
      )

      setProjects(response.data)

    } catch (error) {

      console.log(error)
    }
  }


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axiosInstance.post(
        "/tasks/create/",
        formData
      )

      setShowForm(false)

      setFormData({
        title: "",
        description: "",
        status: "TODO",
        due_date: "",
        project: "",
      })

      fetchTasks()

    } catch (error) {

      console.log(error)

      alert("Failed to create task")
    }
  }


  return (

    <MainLayout>

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-4xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-5 py-3 rounded"
        >
          Create Task
        </button>

      </div>


      {showForm && (

        <div className="bg-white shadow rounded-xl p-6 mb-10">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />


            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />
            <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            >

            <option value="TODO">
                Todo
            </option>

            <option value="IN_PROGRESS">
                In Progress
            </option>

            <option value="DONE">
                Done
            </option>

            </select>


            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />


            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            >

              <option value="">
                Select Project
              </option>

              {projects.map((project) => (

                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>

              ))}

            </select>


            <button
              className="bg-black text-white px-5 py-3 rounded"
            >
              Create Task
            </button>

          </form>

        </div>
      )}


      {loading ? (

        <div>
          Loading tasks...
        </div>

      ) : (

        <div className="grid grid-cols-2 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white shadow rounded-xl p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                <span className="bg-gray-200 px-3 py-1 rounded text-sm">
                  {task.status}
                </span>

              </div>


              <p className="text-gray-600 mb-4">
                {task.description}
              </p>


              <div className="space-y-2 text-sm text-gray-500">

                <p>
                  Due Date: {task.due_date}
                </p>

                <p>
                  Project: {task.project_name || task.project}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </MainLayout>
  )
}

export default Tasks