import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import axiosInstance from "../../api/axios"

function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "MEMBER",
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

      await axiosInstance.post(
        "/auth/signup/",
        formData
      )

      alert("Signup successful")

      navigate("/")

    } catch (error) {

      alert("Signup failed")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <select
          name="role"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        >

          <option value="MEMBER">
            Member
          </option>

          <option value="ADMIN">
            Admin
          </option>

        </select>

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Signup
        </button>

        <p className="mt-4 text-center">

          Already have account?

          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Signup