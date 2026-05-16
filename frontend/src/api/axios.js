import axios from "axios"

const axiosInstance = axios.create({

  baseURL: "https://team-task-manager-production-f0ed.up.railway.app/api",
})


axiosInstance.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("access_token")

    if (token) {

      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => Promise.reject(error)
)

export default axiosInstance