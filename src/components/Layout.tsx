import { Outlet, useNavigate, useParams} from "react-router-dom"
import Header from "./header"
import { useContext } from "react"
import { RealEstateContext } from "../App"
import close from '/delete.png'
import AddAgent from "./AddAgent"

function Layout() {
    const context = useContext(RealEstateContext)
    const params = useParams();
    const navigate = useNavigate();

    const deleteListing = async () =>{
      const url = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${params.listing} `;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer 9d06971e-aaca-4a8e-a40d-e6d89286772c",
          },
        });

        if (!response.ok){
          console.error("Failed to delete listing", response.status);
        }
      } catch (err) {
        console.log("Error", err);
      }
      context?.setDeleteListing(false)
      navigate('/')
    };

  return (
    <>
    <div className={`bg-[#fff] min-h-[100vh] flex flex-col ${context?.deleteListing|| context?.addAgent?"h-[100vh] overflow-hidden":""} `} >
      <Header/>
      <div className="flex justify-center pt-[62px]  h-full flex-grow " >
      <Outlet/>
      </div>
      <div className={` absolute w-[100vw] h-[100vh]  ${context?.deleteListing || context?.addAgent ?"":"hidden"} `} >
      <div className={`absolute z-[1] flex justify-center items-center w-[100%] h-[100%] inset-0 bg-black bg-opacity-30 backdrop-blur-md `} onClick={()=>{
        localStorage.setItem('name',"")
        localStorage.setItem('surname',"")
        localStorage.setItem('email',"")
        localStorage.setItem('phone',"")
        localStorage.setItem('image',"")
        localStorage.setItem('apiImage',"")
        context?.setAddAgent(false)
        localStorage.setItem('addAgent',"false")
        }} >
        <div className={` bg-white rounded-[20px] w-[623px]  px-[30px] py-[24px] ${context?.deleteListing?"":"hidden"} `} >
          <div className="flex justify-end w-[100%] cursor-pointer" onClick={()=>{context?.setDeleteListing(false)}} >
            <img className="w-[30px] h-[30px] " src={close} alt="close" />
          </div>
          <div className=" flex flex-col justify-center items-center w-[100%] mt-[5px]" >
          <h2 className="text-[20px] text-[#2d3648] " >გსურთ წაშალოთ ლისტინგი?</h2>
          <div className="flex gap-[15px] mt-[35px] mb-[58px] " >
            <button className="border border-[#f93b1d] hover:bg-[#f93b1d] text-[#f93b1d] hover:text-[#fff] px-[18px] py-[10px] rounded-[10px] " onClick={()=>{context?.setDeleteListing(false)}} >გაუქმება</button>
            <button className="bg-[#f93b1d] hover:bg-[#DF3014] text-[#fff] px-[18px] py-[10px] rounded-[10px] " onClick={()=>{deleteListing()}} >დადასტურება</button>
          </div>
          </div>
        </div>
      </div>
        <AddAgent />
      </div>
    </div>
    </>
  )
}

export default Layout