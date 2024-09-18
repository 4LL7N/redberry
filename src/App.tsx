import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import Listing from "./components/Listing"

function App() {
  
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/:listing',
          element:<Listing/>
        }
      ]
    }
  ])
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
