import { PricesType } from "../style";

function Prices({
  priceTo,
  priceFrom,
  priceError,
  setPriceError,
  price,
  setPrice,
  setPrices,
}: PricesType) {
  function priceFromButtons(Price: string) {
    if (
      priceTo.current?.value &&
      Number(Price) > Number(priceTo.current?.value)
    ) {
      setPriceError(true);
    } else {
      setPriceError(false);
      if (priceFrom.current) priceFrom.current.value = Price;
    }
  }

  function priceToButtons(Price: string) {
    if (
      priceFrom.current?.value &&
      Number(Price) < Number(priceFrom.current?.value)
    ) {
      setPriceError(true);
    } else {
      setPriceError(false);
      if (priceTo.current) priceTo.current.value = Price;
    }
  }

  return (
    <>
      <div
        className={`absolute left-[155px] top-[57px] p-[24px] w-[382px] bg-[#ffff] border border-[#dbdbdb] rounded-[10px] ${
          price ? "" : "hidden"
        } `}
      >
        <h1 className="text-[16px] text-[#021526] font-bold">ფასის მიხედვით</h1>
        <div className="mt-[24px] w-[100%] flex justify-between relative ">
          <div>
            <div
              className={`w-[155px] p-[10px] border ${
                priceError ? "border-[#f93b1d]" : "border-[#808a93]"
              } rounded-[6px] text-[#2d3648] flex`}
            >
              <input
                type="number"
                onChange={(e) => {
                  if (
                    priceTo.current?.value &&
                    Number(e.target.value) > Number(priceTo.current?.value)
                  ) {
                    setPriceError(true);
                  } else {
                    setPriceError(false);
                  }
                }}
                ref={priceFrom}
                className="w-[100%] bg-transparent outline-none mr-[10px]"
                placeholder="დან"
              />
              ₾
            </div>
            <div className=" flex flex-col mt-[24px] gap-[8px]">
              <h2 className="text-[14px] font-bold text-[#2d3648]">მინ.ფასი</h2>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceFromButtons("50000");
                }}
              >
                50,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceFromButtons("100000");
                }}
              >
                100,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceFromButtons("150000");
                }}
              >
                150,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceFromButtons("200000");
                }}
              >
                200,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceFromButtons("3000000");
                }}
              >
                300,000₾
              </p>
            </div>
          </div>
          <div>
            <div
              className={`w-[155px] p-[10px] border ${
                priceError ? "border-[#f93b1d]" : "border-[#808a93]"
              } rounded-[6px] text-[#2d3648] flex `}
            >
              <input
                type="number"
                onChange={(e) => {
                  if (
                    Number(e.target.value) < Number(priceFrom.current?.value)
                  ) {
                    setPriceError(true);
                  } else {
                    setPriceError(false);
                  }
                }}
                ref={priceTo}
                className="w-[100%] bg-transparent outline-none"
                placeholder="მდე"
              />
              ₾
            </div>
            <div className=" flex flex-col  mt-[24px] gap-[8px]">
              <h2 className="text-[14px] font-bold text-[#2d3648]">
                მაქს.ფასი
              </h2>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceToButtons("50000");
                }}
              >
                50,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceToButtons("100000");
                }}
              >
                100,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceToButtons("150000");
                }}
              >
                150,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceToButtons("200000");
                }}
              >
                200,000₾
              </p>
              <p
                className="text-[14px] text-[#2d3648]"
                onClick={() => {
                  priceToButtons("300000");
                }}
              >
                300,000₾
              </p>
            </div>
          </div>
          <p
            className={`absolute top-[50px] text-[12px] text-[#f93b1d] ${
              priceError ? "" : "hidden"
            } `}
          >
            ჩაწერეთ ვალიდური მონაცემები
          </p>
        </div>
        <div className=" flex justify-end w-[100%] mt-[32px]">
          <button
            className="px-[14px] py-[8px] text-[14px] bg-[#f93b1d] rounded-[8px]  self-end "
            onClick={() => {                
                if(priceFrom.current?.value != "" && priceTo.current?.value == "" ){                    
                    setPriceError(true)
                }else if (!priceError) {                    
                setPrice(false);
                                    
                    const priceString = `${
                        priceFrom.current?.value != ""
                            ? parseInt(Number(priceFrom.current?.value))
                        : "0"
                    }₾ - ${parseInt(Number(priceTo.current?.value))}₾`;                    
                setPrices(priceString);
                
              }
            }}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
}

export default Prices;
