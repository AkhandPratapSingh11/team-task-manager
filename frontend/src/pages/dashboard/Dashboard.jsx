import { useEffect, useState } from "react"

import axiosInstance from "../../api/axios"

import MainLayout from "../../layouts/MainLayout"

import DashboardCard from "../../components/DashboardCard"

function Dashboard() {

  const [stats, setStats] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")


  useEffect(() => {

    fetchDashboardData()

  }, [])


  const fetchDashboardData = async () => {

    try {

      const response = await axiosInstance.get(
        "/dashboard/"
      )

      setStats(response.data)

    } catch (error) {

      setError("Failed to load dashboard data")

    } finally {

      setLoading(false)
    }
  }


  if (loading) {

    return (

      <MainLayout>

        <div className="text-2xl">
          Loading dashboard...
        </div>

      </MainLayout>
    )
  }


  if (error) {

    return (

      <MainLayout>

        <div className="text-red-500 text-2xl">
          {error}
        </div>

      </MainLayout>
    )
  }


  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Total Tasks"
          value={stats.total_tasks}
        />

        <DashboardCard
          title="Completed"
          value={stats.completed_tasks}
        />

        <DashboardCard
          title="Pending"
          value={stats.pending_tasks}
        />

        <DashboardCard
          title="In Progress"
          value={stats.in_progress_tasks}
        />

      </div>

      <div className="grid grid-cols-4 gap-6 mt-6">

        <DashboardCard
          title="Overdue"
          value={stats.overdue_tasks}
        />

      </div>

    </MainLayout>
  )
}

export default Dashboard