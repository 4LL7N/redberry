import { Outlet, useNavigate } from "react-router-dom"
import Header from "./header"
import { useEffect } from "react"

function Layout() {
    const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{navigate('/home')},[])
  return (
    <>
    <div className="bg-[#fff] min-h-[100vh] flex flex-col " >
      <Header/>
      <div className="px-[97px] pt-[62px]  h-full flex-grow " >
      <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Layout