import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Hero from './pages/Home/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'

const router = createBrowserRouter([
    {
        path: '',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Hero/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'login',
                        element: <LoginPage />
                    }
                ]
            },
        ]
    }
])

export default router