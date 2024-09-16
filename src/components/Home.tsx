import { useRef, useState } from "react";
import arrow from "/arrow.png";
import Regions from "./regions";
import Prices from "./prices";
import Area from "./Areas";
import Bedrooms from "./Bedrooms";
import redPlus from "/redPlus.png";
import whitePlus from "/whitePlus.png";
import Delete from "/delete.png";

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

  function deleteRegion(region: string) {
    let arr = regionsChecked;
    arr = arr.filter((item) => item != region);
    setRegionsChecked(arr);
  }

  console.log(bedroomsNum);
  console.log(areas);
  console.log(prices);
  console.log(regionsChecked.length >= 1);

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
                setPrices("");
                if (priceTo.current) priceTo.current.value = "";
                if (priceFrom.current) priceFrom.current.value = "";
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
            <p className="text-[16px] text-[#fff] font-bold ">
              ლისტინგის დამატება
            </p>{" "}
          </div>
          <div className=" flex items-center border border-[#f93b1d] rounded-[10px] px-[16px] py-[10px] ">
            {" "}
            <img src={redPlus} alt="whitePlus" className="mr-[2px]" />
            <p className="text-[16px] text-[#f93b1d] font-bold ">
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
          {prices != ""? (
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
                  if (priceFrom.current) priceFrom.current.value = "";
                }}
              />
            </div>
          ) : null}
        </div>
        <div>
          {areas != "" ?(
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
                  if (areaFrom.current) areaFrom.current.value = "";
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
            }}
          />
        </div>
        {bedroomsNum ||
        areas != "" ||
        prices != "" ||
        regionsChecked.length >= 1 ? (
          <button
            className="text-[#021526] text-[14px] font-bold "
            onClick={() => {
              setRegionsChecked([]);
              if (areaTo.current) areaTo.current.value = "";
              if (areaFrom.current) areaFrom.current.value = "";
              setAreas("");
              setPrices("");
              if (priceTo.current) priceTo.current.value = "";
              if (priceFrom.current) priceFrom.current.value = "";
              setBedroomsNum("");
            }}
          >
            გასუფთავება
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default Home;
