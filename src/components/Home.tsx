import { useRef, useState } from "react";
import arrow from "/arrow.png";
import Regions from "./regions";
import Prices from "./prices";
import Area from "./Areas";
import Bedrooms from "./Bedrooms";
function Home() {
  const [region, setRegion] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [area, setArea] = useState<boolean>(false);
  const [bedrooms, setBedrooms] = useState<boolean>(false);
  const [regionsChecked, setRegionsChecked] = useState<string[]>([]);

  const [priceError, setPriceError] = useState<boolean>(false);
  const priceFrom = useRef<HTMLInputElement>(null);
  const priceTo = useRef<HTMLInputElement>(null);

  const [areaError, setAreaError] = useState<boolean>(false);
  const areaFrom = useRef<HTMLInputElement>(null);
  const areaTo = useRef<HTMLInputElement>(null);

  const [bedroomsNum,setBedroomsNum] = useState<boolean>(false)

  console.log(bedroomsNum);
  

  return (
    <section className="mx-[65px] mt-[15px]">
      <div className="flex justify-between ">
        <div className="flex gap-[24px] p-[6px] border border-[#dbdbdb] rounded-[10px] relative ">
          <button
            className={`text-[#021526] text-[16px] font-bold flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
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
            className={`text-[#021526] text-[16px] font-bold flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
              price ? "bg-[#f3f3f3]" : ""
            } `}
            onClick={() => {
              if (priceError) {
                setPrice(!price);
                if (priceTo.current) priceTo.current.value = "";
                if (priceFrom.current) priceFrom.current.value = "";
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
          />
          <button
            className={`text-[#021526] text-[16px] font-bold flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
              area ? "bg-[#f3f3f3]" : ""
            } `}
            onClick={() => {
              if (areaError) {
                setArea(!area);
                if (areaTo.current) areaTo.current.value = "";
                if (areaFrom.current) areaFrom.current.value = "";
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
          />
          <button
            className={`text-[#021526] text-[16px] font-bold flex gap-[4px] items-center px-[14px] py-[8px] rounded-[6px] ${
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
          <Bedrooms bedrooms={bedrooms} setBedrooms={setBedrooms} bedroomsNum={bedroomsNum} setBedroomsNum={setBedroomsNum} />
        </div>
        <div className="flex gap-[16px]">
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Home;
