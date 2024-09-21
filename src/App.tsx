import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import Listing from "./components/Listing"
import { createContext, useState } from "react"
import { RealEstateContextType } from "./style"
import AddListing from "./components/AddListing"

export const RealEstateContext = createContext<RealEstateContextType|null>(null)

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
        },
        {
          path:'/addlisting',
          element:<AddListing/>
        }
      ]
    }
  ])
  
  
  const [deleteListing,setDeleteListing] = useState<boolean>(false)
  const [addAgent,setAddAgent] = useState<boolean>(false)

  return (
    <>
      <RealEstateContext.Provider value={{deleteListing,setDeleteListing,addAgent,setAddAgent}} >
        <RouterProvider router={router}/>
      </RealEstateContext.Provider>
    </>
  )
}

export default App
