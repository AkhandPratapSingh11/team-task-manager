import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"

import axiosInstance from "../../api/axios"

import { AuthContext } from "../../context/AuthContext"

function Login() {

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axiosInstance.post(
        "/auth/login/",
        formData
      )

      login(response.data.access)

      navigate("/dashboard")

    } catch (error) {

      alert("Invalid credentials")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">

          No account?

          <Link
            to="/signup"
            className="text-blue-500 ml-2"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Login