import { Outlet} from "react-router-dom"
import Header from "./header"

function Layout() {
    
  return (
    <>
    <div className="bg-[#fff] min-h-[100vh] flex flex-col " >
      <Header/>
      <div className="flex justify-center pt-[62px]  h-full flex-grow " >
      <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Layout