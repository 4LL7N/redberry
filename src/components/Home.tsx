/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react";
import arrow from "/arrow.png";
import Regions from "./regions";
import Prices from "./prices";
import Area from "./Areas";
import Bedrooms from "./Bedrooms";
import whitePlus from "/whitePlus.png";
import Delete from "/delete.png";
import { RealEstate } from "../style";
import location from '/location.png'
import bed from '/bed.png'
import areaIcon from '/area.png'
import zip from '/zip.png'
import { useNavigate } from "react-router-dom";
import { RealEstateContext } from "../App";

function Home() {
  const navigate = useNavigate()
  const context = useContext(RealEstateContext)

  const [region, setRegion] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [area, setArea] = useState<boolean>(false);
  const [bedrooms, setBedrooms] = useState<boolean>(false);
  const [regionsChecked, setRegionsChecked] = useState<string[]>([]);

  const [priceError, setPriceError] = useState<boolean>(false);
  const priceFrom = useRef<HTMLInputElement>(null);
  const priceTo = useRef<HTMLInputElement>(null);
  const [prices, setPrices] = useState<string>("");

  const [areaError, setAreaError] = useState<boolean>(false);
  const areaFrom = useRef<HTMLInputElement>(null);
  const areaTo = useRef<HTMLInputElement>(null);
  const [areas, setAreas] = useState<string>("");

  const [bedroomsNum, setBedroomsNum] = useState<string>("");
  const bedroomsRef = useRef<HTMLInputElement>()

  const [data,setData] = useState<RealEstate[]>([])
  const [houses,setHouses] = useState<RealEstate[]>([])

  const [plusIcon,setPlusIcon] = useState<string>('/redPlus.png')
  function deleteRegion(region: string) {
    let arr = regionsChecked;
    arr = arr.filter((item) => item != region);
    localStorage.setItem("Regions",JSON.stringify(arr))
    setRegionsChecked(arr);
  }

  function filter(){
    const AreaFrom = localStorage?.getItem("areaFrom");
    const AreaTo = localStorage?.getItem("areaTo");
    const PriceFrom = localStorage?.getItem("priceFrom");
    const PriceTo = localStorage?.getItem("priceTo");

    const BedroomsNum = localStorage.getItem('BedroomsNum')

    let RegionArr:any = localStorage.getItem("Regions")
    if(RegionArr)RegionArr=JSON.parse(RegionArr)

    let houseData:RealEstate[] = []

    if(AreaTo != "" && AreaFrom != "" ){
      
      houseData = data.filter((item: any) => {
        const itemArea = parseFloat(item.area); 
        const minArea = parseFloat(AreaFrom || "0");
        const maxArea = parseFloat(AreaTo || "0")

        return !isNaN(itemArea) && itemArea >= minArea && itemArea <= maxArea; 
      })
      
    }
    if(PriceTo != "" && PriceFrom != "" ){
      const Data = data.filter((item: any) => {
        const itemPrice = parseFloat(item.price); // Use parseFloat for floating-point numbers
        const minPrice = parseFloat(PriceFrom || "0"); // Default to 0 if value is undefined
        const maxPrice = parseFloat(PriceTo || "0")

        return !isNaN(itemPrice) && itemPrice >= minPrice && itemPrice <= maxPrice; // Filter based on parsed numbers
      });
      const LessData:RealEstate[] = Data.length < houseData.length? Data: houseData
      const MoreData:RealEstate[] = Data.length > houseData.length? Data: houseData
      for (let i = 0; i < LessData.length; i++) {
        if(!MoreData.includes(LessData[i])){          
          MoreData.push(LessData[i])
        }
      }
      houseData = MoreData
    }

    if(RegionArr.length > 0){
      

      const Data = data.filter((item:RealEstate)=>{
        return RegionArr.includes(item.city.region.name)
      })
      
      const LessData:RealEstate[] = Data.length < houseData.length? Data: houseData
      const MoreData:RealEstate[] = Data.length > houseData.length? Data: houseData
      for (let i = 0; i < LessData.length; i++) {
        if(!MoreData.includes(LessData[i])){          
          MoreData.push(LessData[i])
        }
      }
      houseData = MoreData

    }

    if(BedroomsNum){
      
      
      const Data = data.filter((item:RealEstate)=>{
          if(BedroomsNum == ""){
            return true
          }else{
            return item.bedrooms == Number(BedroomsNum)
          }
        })
        
        
      const LessData:RealEstate[] = Data.length < houseData.length? Data: houseData
      const MoreData:RealEstate[] = Data.length > houseData.length? Data: houseData
      for (let i = 0; i < LessData.length; i++) {
        if(!MoreData.includes(LessData[i])){          
          MoreData.push(LessData[i])
        }
      }
      houseData = MoreData

    }
    if((PriceTo != "" && PriceFrom != "") || (RegionArr.length > 0) || (BedroomsNum) || (AreaTo != "" && AreaFrom != "")  ){
      
    setHouses(houseData)
    }else{
      setHouses(data)
    }
  }

  
  useEffect(() => {
    const AreaFrom:any = localStorage?.getItem("areaFrom");
    if (AreaFrom && areaFrom.current) areaFrom.current.value = AreaFrom;
    const AreaTo:any = localStorage?.getItem("areaTo");
    if (AreaTo && areaTo.current) areaTo.current.value = AreaTo;

    if (AreaTo != "" && AreaTo !== null && AreaFrom != "" && AreaFrom !== null ) {
    const areaString = `${
      areaFrom.current?.value != "" ? parseInt(AreaFrom) : "0"
    }მ² - ${parseInt(AreaTo)}მ²`;
    if (AreaTo != "" && AreaFrom != "") {
      setAreas(areaString);
    }
    }

    const PriceFrom:any = localStorage?.getItem("priceFrom");    
    if (PriceFrom  && priceFrom.current) priceFrom.current.value = PriceFrom;
    const PriceTo:any = localStorage?.getItem("priceTo");
    if (PriceTo && priceTo.current) priceTo.current.value = PriceTo;

    if ((PriceTo != "" && PriceTo !== null) && PriceFrom != "" && PriceFrom !== null ) {
      const priceString = `${
        priceFrom.current?.value != ""
          ? parseInt(PriceFrom)
          : "0"
      }₾ - ${parseInt(PriceTo)}₾`;
      setPrices(priceString);
    }

    let RegionArr:any = localStorage.getItem("Regions")
    if(RegionArr)setRegionsChecked(JSON.parse(RegionArr));RegionArr=JSON.parse(RegionArr)

    const BedroomsNum:any = localStorage.getItem('BedroomsNum')
    if(BedroomsNum )setBedroomsNum(BedroomsNum);
    if(bedroomsRef.current)bedroomsRef.current.value = BedroomsNum

    const AddAgent = localStorage.getItem("addAgent")
    if(AddAgent == "true")context?.setAddAgent(true)
      
    const fetchData = async () =>{
      try{ 
        const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates",{
          method:'GET',
          headers:{
            'Authorization':"Bearer 9d06971e-aaca-4a8e-a40d-e6d89286772c",
            'Content-Type':'application/json'
          }
        })        
        if(!response.ok)throw new Error(`HTTP ERRor! status: ${response.status} `)
          const data = await response.json()
          setData(data)

          let houseData:RealEstate[] = []

          if(AreaTo != "" && AreaTo !== null && AreaFrom != "" && AreaFrom !== null){
            
            houseData = data.filter((item: any) => {
              const itemArea = parseFloat(item.area); 
              const minArea = parseFloat(AreaFrom || "0");
              const maxArea = parseFloat(AreaTo || "0")
      
              return !isNaN(itemArea) && itemArea >= minArea && itemArea <= maxArea; 
            })
            
          }
          if((PriceTo != "" && PriceTo !== null) && PriceFrom != "" && PriceFrom !== null){
            const Data = data.filter((item: any) => {
              const itemPrice = parseFloat(item.price); // Use parseFloat for floating-point numbers
              const minPrice = parseFloat(PriceFrom || "0"); // Default to 0 if value is undefined
              const maxPrice = parseFloat(PriceTo || "0")
      
              return !isNaN(itemPrice) && itemPrice >= minPrice && itemPrice <= maxPrice; // Filter based on parsed numbers
            });
            const LessData:RealEstate[] = Data.length < houseData.length? Data: houseData
            const MoreData:RealEstate[] = Data.length > houseData.length? Data: houseData
            for (let i = 0; i < LessData.length; i++) {
              if(!MoreData.includes(LessData[i])){          
                MoreData.push(LessData[i])
              }
            }
            houseData = MoreData
          }
      
          if(RegionArr && RegionArr.length > 0){
            
      
            const Data = data.filter((item:RealEstate)=>{
              return RegionArr.includes(item.city.region.name)
            })
            
            const LessData:RealEstate[] = Data.length < houseData.length? Data: houseData
            const MoreData:RealEstate[] = Data.length > houseData.length? Data: houseData
            for (let i = 0; i < LessData.length; i++) {
              if(!MoreData.includes(LessData[i])){          
                MoreData.push(LessData[i])
              }
            }
            houseData = MoreData
      
          }
      
          if(BedroomsNum){
            
            
            const Data = data.filter((item:RealEstate)=>{
                if(BedroomsNum == ""){
                  return true
                }else{
                  return item.bedrooms == Number(BedroomsNum)
                }
              })
              
            const LessData:RealEstate[] = Data.length < houseData.length? Data: houseData
            const MoreData:RealEstate[] = Data.length > houseData.length? Data: houseData
            for (let i = 0; i < LessData.length; i++) {
              if(!MoreData.includes(LessData[i])){          
                MoreData.push(LessData[i])
              }
            }
            houseData = MoreData
      
          }
          
          if((PriceTo != "" && PriceTo != null && PriceFrom != "" && PriceFrom != "") || (RegionArr!== null && RegionArr.length > 0) || BedroomsNum !==null || (AreaTo != "" && AreaTo != null && AreaFrom != "" && AreaFrom != null)  ){            
            setHouses(houseData)
          }else{
            setHouses(data)
          }
          
      }catch(err){
        console.log("Error",err);
        
      }
    }
    console.log('fetchhhh');
    
    fetchData()
  }, []);
  
  
  
  return (
    <section className="mt-[15px] flex flex-col w-[1596px] pb-[228px]">
      <div className="flex justify-between ">
        <div className="flex gap-[24px] p-[6px] border border-[#dbdbdb] rounded-[10px] relative ">
          <button
            className={`text-[#021526] text-[16px] font-medium flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
              region ? "bg-[#f3f3f3]" : ""
            } `}
            onClick={() => {
              setRegion(!region);
            }}
          >
            რეგიონი
            <img
              src={arrow}
              alt="arrow"
              className={` transition-transform duration-500 ${
                region ? " rotate-180" : ""
              }`}
            />
          </button>
          <Regions
            region={region}
            setRegion={setRegion}
            regionsChecked={regionsChecked}
            setRegionsChecked={setRegionsChecked}
            filter={filter}
          />
          <button
            className={`text-[#021526] text-[16px] font-medium flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
              price ? "bg-[#f3f3f3]" : ""
            } `}
            onClick={() => {
              if (priceError) {
                setPrice(!price);
                setPrices("");
                if (priceTo.current) priceTo.current.value = "";
                localStorage?.setItem("priceTo", "");
                if (priceFrom.current) priceFrom.current.value = "";
                localStorage?.setItem("priceFrom", "");
                setPriceError(false);
              } else {
                setPrice(!price);
              }
            }}
          >
            საფასო კატეგორია
            <img
              src={arrow}
              alt="arrow"
              className={` transition-transform duration-500 ${
                price ? " rotate-180" : ""
              }`}
            />
          </button>
          <Prices
            priceTo={priceTo}
            priceFrom={priceFrom}
            priceError={priceError}
            setPriceError={setPriceError}
            price={price}
            setPrice={setPrice}
            setPrices={setPrices}
            filter={filter}
          />
          <button
            className={`text-[#021526] text-[16px] font-medium flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
              area ? "bg-[#f3f3f3]" : ""
            } `}
            onClick={() => {
              if (areaError) {
                setArea(!area);
                if (areaTo.current) areaTo.current.value = "";
                localStorage.setItem("areaTo", "");
                if (areaFrom.current) areaFrom.current.value = "";
                localStorage.setItem("areaFrom", "");
                setAreaError(false);
              } else {
                setArea(!area);
              }
            }}
          >
            ფართობი
            <img
              src={arrow}
              alt="arrow"
              className={` transition-transform duration-500 ${
                area ? "rotate-180" : " "
              }`}
            />
          </button>
          <Area
            areaTo={areaTo}
            areaFrom={areaFrom}
            areaError={areaError}
            setAreaError={setAreaError}
            area={area}
            setArea={setArea}
            setAreas={setAreas}
            filter={filter}
          />
          <button
            className={`text-[#021526] text-[16px] font-medium flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
              bedrooms ? "bg-[#f3f3f3]" : ""
            } `}
            onClick={() => {
              setBedrooms(!bedrooms);
            }}
          >
            საძინებლის რაოდენობა
            <img
              src={arrow}
              alt="arrow"
              className={` transition-transform duration-500 ${
                bedrooms ? " rotate-180" : ""
              }`}
            />
          </button>
          <Bedrooms
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bedroomsNum={bedroomsNum}
            setBedroomsNum={setBedroomsNum}
            bedroomsRef={bedroomsRef}
            filter={filter}
          />
        </div>
        <div className="flex gap-[16px]">
          <button className=" flex items-center bg-[#f93b1d] hover:bg-[#DF3014] rounded-[10px] px-[16px] py-[10px] " onClick={()=>{navigate('/addlisting')}} >
            {" "}
            <img src={whitePlus} alt="whitePlus" className="mr-[2px]" />
            <p className="text-[16px] text-[#fff] font-medium ">
              ლისტინგის დამატება
            </p>{" "}
          </button>
          <div onMouseEnter={()=>{setPlusIcon('/whitePlus.png')}} onMouseLeave={()=>{setPlusIcon('/redPlus.png')}} onClick={()=>{context?.setAddAgent(true);localStorage.setItem('addAgent','true') }} className=" flex items-center border border-[#f93b1d] hover:bg-[#f93b1d] text-[#f93b1d] hover:text-[#fff] rounded-[10px] px-[16px] py-[10px] ">
            {" "}
            <img src={plusIcon}   alt="whitePlus" className="mr-[2px]" />
            <p className="text-[16px]  font-medium ">
              აგენტის დამატება
            </p>{" "}
          </div>
        </div>
      </div>
      <div className=" flex gap-[8px] mt-[16px] ">
        {regionsChecked.length >= 1
          ? regionsChecked.map((item) => {
              return (
                <>
                  <div className=" inline-flex items-center border border-[#dbdbdb] rounded-[43px] px-[10px] py-[6px] gap-[4px] ">
                    <p className="text-[14px] leading-[17px] text-[#021526]">
                      {item}
                    </p>
                    <img
                      src={Delete}
                      alt="delete"
                      className="w-[14px] h-[14px] "
                      onClick={() => {
                        deleteRegion(item);
                        filter()
                      }}
                    />
                  </div>
                </>
              );
            })
          : null}
        <div>
          {prices != "" ? (
            <div className=" inline-flex items-center border border-[#dbdbdb] rounded-[43px] px-[10px] py-[6px] gap-[4px] ">
              <p className="text-[14px] leading-[17px] text-[#021526]">
                {prices}
              </p>
              <img
                src={Delete}
                alt="delete"
                className="w-[14px] h-[14px] "
                onClick={() => {
                  setPrices("");
                  if (priceTo.current) priceTo.current.value = "";
                  localStorage?.setItem("priceTo", "");
                  if (priceFrom.current) priceFrom.current.value = "";
                  localStorage?.setItem("priceFrom", "");
                  filter()
                }}
              />
            </div>
          ) : null}
        </div>
        <div>
          {areas != "" ? (
            <div className=" inline-flex items-center border border-[#dbdbdb] rounded-[43px] px-[10px] py-[6px] gap-[4px] ">
              <p className="text-[14px] leading-[17px] text-[#021526]">
                {areas}
              </p>
              <img
                src={Delete}
                alt="delete"
                className="w-[14px] h-[14px] "
                onClick={() => {
                  setAreas("");
                  if (areaTo.current) areaTo.current.value = "";
                  localStorage.setItem("areaTo", "");
                  if (areaFrom.current) areaFrom.current.value = "";
                  localStorage.setItem("areaFrom", "");
                  filter()
                }}
              />
            </div>
          ) : null}
        </div>
        <div
          className={` inline-flex items-center border border-[#dbdbdb] rounded-[43px] px-[10px] py-[6px] gap-[4px] ${
            bedroomsNum ? "" : "hidden"
          }`}
        >
          <p className="text-[14px] leading-[17px] text-[#021526]">
            {bedroomsNum}
          </p>
          <img
            src={Delete}
            alt="delete"
            className="w-[14px] h-[14px] "
            onClick={() => {
              setBedroomsNum("");
              localStorage.setItem('BedroomsNum',"")
              if(bedroomsRef.current)bedroomsRef.current.value = ""
              filter()
            }}
          />
        </div>
        {bedroomsNum ||
        areas != "" ||
        prices != "" ||
        regionsChecked.length >= 1 ? (
          <button
            className="text-[#021526] text-[14px] font-medium "
            onClick={() => {
              setRegionsChecked([]);
              localStorage.setItem("Regions","[]")
              if (areaTo.current) areaTo.current.value = "";
              localStorage.setItem("areaTo", "");
              if (areaFrom.current) areaFrom.current.value = "";
              localStorage.setItem("areaFrom", "");
              setAreas("");
              setPrices("");
              if (priceTo.current) priceTo.current.value = "";
              localStorage?.setItem("priceTo", "");
              if (priceFrom.current) priceFrom.current.value = "";
              localStorage?.setItem("priceFrom", "");
              setBedroomsNum("");
              localStorage.setItem('BedroomsNum',"")
              if(bedroomsRef.current)bedroomsRef.current.value = ""
              filter()
            }}
          >
            გასუფთავება
          </button>
        ) : null}
      </div>
      <main className="flex-grow grid grid-cols-4 gap-y-[20px] mt-[32px]  ">
        {houses? houses.map((item:RealEstate,i:number) => {          
          return(
              <div key={i} className="bg-[#fff] rounded-[14px] overflow-hidden w-[384px] flex flex-col " onClick={()=>{navigate(`${item.id}`)}}  >
                <div className="relative" >
                  <img className=" w-[384px] h-[307px]" src={item.image} alt="" />
                  <div className="absolute left-[23px] top-[23px] bg-[#02152680] rounded-[15px] text-[12px] text-[#fff] px-[10px] py-[6px] font-medium " >{item.is_rental == 0?"იყიდება":"ქირავდება"}</div>
                </div>
                <div className="border border-x-[#dbdbdb] border-b-[#dbdbdb] rounded-b-[14px] px-[25px] py-[22px] " >
                  <h1 className="text-[28px] text-[#021526] font-bold ">{item.price}₾</h1>
                  <div className="flex gap-[4px] mt-[6.5px]">
                    <img className="w-[20xp] h-[20px] " src={location} alt="location" />
                    <p className="text-[16px] text-[#021526b3] " >{item.city.name},{item.address}</p>
                  </div>
                  <div className="flex gap-[32px] mt-[20px] " >
                    <div className="flex gap-[5px] " ><img className="w-[18px] h-[18px]"  src={bed} alt="bed" /><p className="text-[16px] text-[#021526b3] ">{item.bedrooms}</p></div>
                    <div className="flex gap-[5px] " ><img className="w-[18px] h-[18px]"  src={areaIcon} alt="area" /><p className="text-[16px] text-[#021526b3] ">{item.area}</p></div>
                    <div className="flex gap-[5px] " ><img className="w-[18px] h-[18px]"  src={zip} alt="zip" /><p className="text-[16px] text-[#021526b3] ">{item.zip_code}</p></div>
                  </div>
                </div>
              </div>
          )
        })
        :null}
      </main>
    </section>
  );
}

export default Home;
