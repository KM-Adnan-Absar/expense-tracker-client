import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import AddExpenses from './components/AddExpenses.jsx';
import AllExpenses from './components/AllExpenses.jsx';
import UpdateInfo from './pages/UpdateInfo.jsx';
import MainLayout from './layout/MainLayout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/addexpenses',
        element: <AddExpenses></AddExpenses>
      },
      {
        path: '/allexpenses',
        element: <AllExpenses></AllExpenses>
      },
      {
        path:'/updateinfo/:id',
        element: <UpdateInfo></UpdateInfo>,
        loader: ({params}) => fetch(`https://expense-tracker-server-lemon.vercel.app/expenses/${params.id}`)
      },

    
     
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
