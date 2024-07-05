import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Hero from './pages/Home/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import SignupPage from './pages/Signup/Signup.jsx'
import Merge from './pages/Merge/Merge.jsx'

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
                    },
                    {
                        path: 'signup',
                        element: <SignupPage />
                    },
                ]
            },
            {
                path: '/merge',
                element: <Merge />
            }
        ]
    }
])

export default router