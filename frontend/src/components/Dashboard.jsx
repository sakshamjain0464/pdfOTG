import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Dashboard() {

  return (
    <main className="h-fit w-full bg-base-200">
        <Outlet />
    </main>
  )
}

export default Dashboard
