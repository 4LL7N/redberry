import { Outlet, useNavigate } from "react-router-dom"
import Header from "./header"
import { useEffect } from "react"

function Layout() {
    const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{navigate('/home')},[])
  return (
    <>
    <div className="bg-[#fff] min-h-[100vh]" >
      <Header/>
      <div className="px-[97px] pt-[62px]" >
      <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Layout