function DashboardCard({ title, value }) {

  return (

    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-gray-500 text-lg mb-2">
        {title}
      </h2>

      <p className="text-4xl font-bold">
        {value}
      </p>

    </div>
  )
}

export default DashboardCard