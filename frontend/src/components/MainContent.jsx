import { Outlet } from 'react-router-dom'

function MainContent() {
  return (
    <div className="max-h-full h-full w-full bg-base-200">
        <Outlet />
    </div>
  )
}

export default MainContent
