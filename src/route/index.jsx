import { createBrowserRouter } from "react-router";
import App from '../App'
import Home from '../view/home'
import '../index.css'

export const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home />
    }
    
    
])
