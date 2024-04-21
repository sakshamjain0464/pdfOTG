import { Outlet } from 'react-router-dom'

function MainContent() {
  return (
    <main className="sm:max-h-[90vh] h-full w-full bg-base-200">
        <Outlet />
    </main>
  )
}

export default MainContent
