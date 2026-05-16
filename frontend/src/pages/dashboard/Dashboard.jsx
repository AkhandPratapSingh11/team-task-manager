import MainLayout from "../../layouts/MainLayout"

import DashboardCard from "../../components/DashboardCard"

function Dashboard() {

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Total Tasks"
          value="12"
        />

        <DashboardCard
          title="Completed"
          value="5"
        />

        <DashboardCard
          title="Pending"
          value="4"
        />

        <DashboardCard
          title="Overdue"
          value="3"
        />

      </div>

    </MainLayout>
  )
}

export default Dashboard