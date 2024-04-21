import { Outlet } from 'react-router-dom'

function MainContent() {
  return (
    <main className="max-h-full h-full w-full bg-base-200">
        <Outlet />
    </main>
  )
}

export default MainContent
