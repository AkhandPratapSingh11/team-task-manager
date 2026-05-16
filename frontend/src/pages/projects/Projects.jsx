import { useEffect, useState } from "react"

import axiosInstance from "../../api/axios"

import MainLayout from "../../layouts/MainLayout"

function Projects() {

  const [projects, setProjects] = useState([])

  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })


  useEffect(() => {

    fetchProjects()

  }, [])


  const fetchProjects = async () => {

    try {

      const response = await axiosInstance.get(
        "/projects/"
      )

      setProjects(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
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
        "/projects/create/",
        formData
      )

      setShowForm(false)

      setFormData({
        name: "",
        description: "",
      })

      fetchProjects()

    } catch (error) {

      alert("Failed to create project")
    }
  }


  return (

    <MainLayout>

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-5 py-3 rounded"
        >
          Create Project
        </button>

      </div>


      {showForm && (

        <div className="bg-white shadow rounded-xl p-6 mb-10">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <button
              className="bg-black text-white px-5 py-3 rounded"
            >
              Create
            </button>

          </form>

        </div>
      )}


      {loading ? (

        <div>
          Loading projects...
        </div>

      ) : (

        <div className="grid grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project.id}
              className="bg-white shadow rounded-xl p-6"
            >

              <h2 className="text-2xl font-bold mb-3">
                {project.name}
              </h2>

              <p className="text-gray-600 mb-3">
                {project.description}
              </p>

              <p className="text-sm text-gray-500">
                Created by: {project.created_by}
              </p>

            </div>

          ))}

        </div>
      )}

    </MainLayout>
  )
}

export default Projects