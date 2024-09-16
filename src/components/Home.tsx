import { useEffect, useRef, useState } from "react";
import arrow from "/arrow.png";
import Regions from "./regions";
import Prices from "./prices";
import Area from "./Areas";
import Bedrooms from "./Bedrooms";
import redPlus from "/redPlus.png";
import whitePlus from "/whitePlus.png";
import Delete from "/delete.png";
import { RealEstate } from "../style";
import location from '/location.png'
import bed from '/bed.png'
import areaIcon from '/area.png'
import zip from '/zip.png'

function Home() {
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

  const [houses,setHouses] = useState<RealEstate[]>([])

  function deleteRegion(region: string) {
    let arr = regionsChecked;
    arr = arr.filter((item) => item != region);
    localStorage.setItem("Regions",JSON.stringify(arr))
    setRegionsChecked(arr);
  }

  useEffect(() => {
    const AreaFrom = localStorage?.getItem("areaFrom");
    if (AreaFrom && areaFrom.current) areaFrom.current.value = AreaFrom;
    const AreaTo = localStorage?.getItem("areaTo");
    if (AreaTo && areaTo.current) areaTo.current.value = AreaTo;
    if (AreaTo != "" && AreaFrom != "") {
      const areaString = `${
        areaFrom.current?.value != "" ? parseInt(Number(AreaFrom)) : "0"
      }მ² - ${parseInt(Number(AreaTo))}მ²`;
      setAreas(areaString);
    }

    const PriceFrom = localStorage?.getItem("priceFrom");
    if (PriceFrom && priceFrom.current) priceFrom.current.value = PriceFrom;
    const PriceTo = localStorage?.getItem("priceTo");
    if (PriceTo && priceTo.current) priceTo.current.value = PriceTo;

    if (PriceTo != "" && PriceFrom != "") {
      const priceString = `${
        priceFrom.current?.value != ""
          ? parseInt(Number(priceFrom.current?.value))
          : "0"
      }₾ - ${parseInt(Number(priceTo.current?.value))}₾`;
      setPrices(priceString);
    }

    const RegionArr = localStorage.getItem("Regions")
    if(RegionArr)setRegionsChecked(JSON.parse(RegionArr))

      const BedroomsNum = localStorage.getItem('BedroomsNum')
      if(BedroomsNum)setBedroomsNum(BedroomsNum)

    const fetchData = async () =>{
      console.log("before");
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
        setHouses(data)
      }catch(err){
        console.log("Error",err);
        
      }
    }
    fetchData()
  }, []);
  console.log(houses);
  
  return (
    <section className="mx-[65px] mt-[15px] flex flex-col pb-[228px] ">
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
                if (
                  priceTo.current?.value != "" &&
                  priceFrom.current?.value != ""
                ) {
                  const priceString = `${
                    priceFrom.current?.value != ""
                      ? parseInt(Number(priceFrom.current?.value))
                      : "0"
                  }₾ - ${parseInt(Number(priceTo.current?.value))}₾`;
                  setPrices(priceString);
                }
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
                if (
                  areaTo.current &&
                  areaTo.current.value != "" &&
                  areaFrom.current &&
                  areaFrom.current.value != ""
                ) {
                  const areaString = `${
                    areaFrom.current?.value != ""
                      ? parseInt(Number(areaFrom.current?.value))
                      : "0"
                  }მ² - ${parseInt(Number(areaTo.current?.value))}მ²`;

                  setAreas(areaString);
                }
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
          />
        </div>
        <div className="flex gap-[16px]">
          <div className=" flex items-center bg-[#f93b1d] rounded-[10px] px-[16px] py-[10px] ">
            {" "}
            <img src={whitePlus} alt="whitePlus" className="mr-[2px]" />
            <p className="text-[16px] text-[#fff] font-medium ">
              ლისტინგის დამატება
            </p>{" "}
          </div>
          <div className=" flex items-center border border-[#f93b1d] rounded-[10px] px-[16px] py-[10px] ">
            {" "}
            <img src={redPlus} alt="whitePlus" className="mr-[2px]" />
            <p className="text-[16px] text-[#f93b1d] font-medium ">
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
            }}
          >
            გასუფთავება
          </button>
        ) : null}
      </div>
      <div className="flex-grow grid grid-cols-4 gap-y-[20px] mt-[32px] ">
        {houses? houses.map((item:RealEstate) => {
          return(
            <>  
              <div className="bg-[#fff] rounded-[14px] overflow-hidden w-[384px] flex flex-col " >
                <div className="relative" >
                  <img className=" w-[384px] h-[307px]" src={item.image} alt="" />
                  <div className="absolute left-[23px] top-[23px] bg-[#02152680] rounded-[15px] text-[12px] text-[#fff] px-[10px] py-[6px] font-medium " >ქირავდება</div>
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
            </>
          )
        })
        :null}
      </div>
    </section>
  );
}

export default Home;
