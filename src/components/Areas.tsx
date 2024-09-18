import { AreasType, } from "../style";

function Area({
  areaTo,
  areaFrom,
  areaError,
  setAreaError,
  area,
  setArea,
  setAreas,
  filter
}: AreasType) {
  function areaFromButtons(Area: string) {
    if (areaTo.current?.value && Number(Area) >= Number(areaTo.current?.value)) {
      setAreaError(true);
    } else {
      setAreaError(false);
      if (areaFrom.current) areaFrom.current.value = Area;
      localStorage.setItem("areaFrom",Area)
    }
  }

  function areaToButtons(Area: string) {
    if (
      areaFrom.current?.value &&
      Number(Area) <= Number(areaFrom.current?.value)
    ) {
      setAreaError(true);
    } else {
      setAreaError(false);
      if (areaTo.current) areaTo.current.value = Area;
      localStorage.setItem("areaTo",Area)
    }
  }

  console.log(Number(areaFrom.current?.value));
  

  return (
    <>
      <div
        className={`absolute left-[398px] top-[57px] p-[24px] w-[382px] bg-[#ffff] border border-[#dbdbdb] rounded-[10px] ${
          area ? "" : "hidden"
        } z-[1] `}
      >
        <h1 className="text-[16px] text-[#021526] font-medium">
          ფრთობის მიხედვით
        </h1>
        <div className="mt-[24px] w-[100%] flex justify-between relative ">
          <div>
            <div
              className={`w-[155px] p-[10px] border ${
                areaError ? "border-[#f93b1d]" : "border-[#808a93]"
              } rounded-[6px] text-[#2d3648] flex`}
            >
              <input
                type="number"
                onChange={(e) => {
                  if (
                    areaTo.current?.value &&
                    Number(e.target.value) >= Number(areaTo.current?.value) 
                    
                  ) {
                    setAreaError(true);
                  } else {
                    // console.log(Number(e.target.value));
                    // console.log(Number(areaTo.current?.value));
                    
                    if(Number(e.target.value) < 0 || Number(areaTo.current?.value) < 0){
                      console.log("err");
                      
                      setAreaError(true)
                    }else{

                      localStorage.setItem("areaFrom",e.target.value)
                      setAreaError(false);
                    }
                  }
                }}
                ref={areaFrom}
                className="w-[100%] bg-transparent outline-none mr-[10px]"
                placeholder="დან"
              />
              მ<sup className="text-[10px] relative top-[5px]">2</sup>
            </div>
            <div className=" flex flex-col mt-[24px] gap-[8px]">
              <h2 className="text-[14px] font-bold text-[#2d3648]">
                მინ. მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </h2>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaFromButtons("50");
                  
                }}
              >
                50 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaFromButtons("75");
                  
                }}
              >
                75 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaFromButtons("100");
                  
                }}
              >
                100 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaFromButtons("150");
                  
                }}
              >
                150 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaFromButtons("200");
                 
                }}
              >
                200 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
            </div>
          </div>
          <div>
            <div
              className={`w-[155px] p-[10px] border ${
                areaError ? "border-[#f93b1d]" : "border-[#808a93]"
              } rounded-[6px] text-[#2d3648] flex `}
            >
              <input
                type="number"
                onChange={(e) => {
                  if (
                    Number(e.target.value) <= Number(areaFrom.current?.value)
                  ) {
                    setAreaError(true);
                  } else {
                    
                    
                    if(Number(e.target.value) < 0 || Number(areaFrom.current?.value) < 0){
                      console.log("err");
                      
                      setAreaError(true)
                    }else{

                      localStorage.setItem("areaTo",e.target.value)
                    setAreaError(false);
                    }
                    
                  }
                }}
                ref={areaTo}
                className="w-[100%] bg-transparent outline-none"
                placeholder="მდე"
              />
              მ<sup className="text-[10px] relative top-[5px]">2</sup>
            </div>
            <div className=" flex flex-col  mt-[24px] gap-[8px]">
              <h2 className="text-[14px] font-bold text-[#2d3648]">
                მაქს. მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </h2>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaToButtons("50");
                  
                }}
              >
                50 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaToButtons("75");
                  
                }}
              >
                75 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaToButtons("100");
                  
                }}
              >
                100 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaToButtons("150");
                  
                }}
              >
                150 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  areaToButtons("200");
                  
                }}
              >
                200 მ<sup className="text-[10px] relative top-[-5px]">2</sup>
              </p>
            </div>
          </div>
          <p
            className={`absolute top-[50px] text-[12px] text-[#f93b1d] ${
              areaError ? "" : "hidden"
            } `}
          >
            ჩაწერეთ ვალიდური მონაცემები
          </p>
        </div>
        <div className=" flex justify-end w-[100%] mt-[32px]">
          <button
            className="px-[14px] py-[8px] text-[14px] bg-[#f93b1d] rounded-[8px]  self-end "
            onClick={() => {
                if(areaFrom.current?.value != "" && areaTo.current?.value == "" ){
                    setAreaError(true)
                    localStorage.setItem("areaFrom","")
                    localStorage.setItem("areaTo","")
                }else if(areaFrom.current?.value == "" && areaTo.current?.value == ""){
                  setAreas('')
                  setArea(false);
                  localStorage.setItem("areaFrom","")
                    localStorage.setItem("areaTo","")
                }else if (!areaError) {
                    const areaString = `${
                      areaFrom.current?.value != ""
                        ? parseInt(areaFrom.current?.value)
                        : "0"
                    }მ² - ${parseInt(areaTo.current?.value)}მ²`;
                    if(areaFrom.current?.value == ""){ areaFrom.current.value = "0";localStorage.setItem("areaFrom","0")}
                    setAreas(areaString);
                    setArea(false);
                    filter()
                    
                }

              }
            }
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
}

export default Area;
