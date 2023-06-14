import { Login, SignUp } from '../components'

export const authRoutes = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
]