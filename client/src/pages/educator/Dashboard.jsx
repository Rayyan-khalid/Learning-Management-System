import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const Dashboard = () => {
  const [dashBoardData, setDashBoardData] = useState(null)
  const { currency } = useContext(AppContext)

  const fetchDashBoardData = async () => {
    setDashBoardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashBoardData()
  }, [])

  return dashBoardData ? (
    <div className="min-h-screen flex flex-col gap-10 md:p-8 p-4 bg-gray-50">
      
      {/* ================= Summary Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {/* Total Enrollments */}
        <div className="flex items-center gap-4 shadow-md border border-blue-500/40 p-5 rounded-lg w-full bg-white hover:shadow-lg transition">
          <img src={assets.patients_icon} alt="patients_icon" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashBoardData.enrolledStudentsData.length}</p>
            <p className="text-sm text-gray-500">Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="flex items-center gap-4 shadow-md border border-blue-500/40 p-5 rounded-lg w-full bg-white hover:shadow-lg transition">
          <img src={assets.appointments_icon} alt="appointments_icon" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashBoardData.totalCouses}</p>
            <p className="text-sm text-gray-500">Total Courses</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="flex items-center gap-4 shadow-md border border-blue-500/40 p-5 rounded-lg w-full bg-white hover:shadow-lg transition">
          <img src={assets.earning_icon} alt="earning_icon" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {currency} {dashBoardData.totalEarnings}
            </p>
            <p className="text-sm text-gray-500">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* ================= Latest Enrollments Table ================= */}
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium text-gray-800">Latest Enrollments</h2>
        <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50 text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell w-12">#</th>
                <th className="px-4 py-3 font-semibold text-left">Student Name</th>
                <th className="px-4 py-3 font-semibold text-left">Course Title</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              {dashBoardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                  <td className="md:px-4 px-2 py-3 flex items-center gap-3">
                    <img
                      src={item.student.imageUrl}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Dashboard
