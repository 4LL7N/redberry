import { Outlet, useNavigate } from "react-router-dom"
import Header from "./header"
import { useEffect } from "react"

function Layout() {
    const navigate = useNavigate()
  useEffect(()=>{navigate('/home')},[])
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Layout