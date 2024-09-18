import { BedroomsType } from "../style";

function Bedrooms({
  bedrooms,
  setBedrooms,
  bedroomsNum,
  setBedroomsNum,
  bedroomsRef,
  filter
}: BedroomsType) {
  
  return (
    <>
      <div
        className={`absolute left-[555px] top-[57px] p-[24px] w-[382px] bg-[#ffff] border border-[#dbdbdb] rounded-[10px] ${
          bedrooms ? "" : "hidden"
        }  z-[1]`}
      >
        <h1 className="text-[16px] text-[#021526] font-medium ">
          საძინებლების რაოდენობა
        </h1>
        <div className="flex gap-[8px] ">
          <div className={` w-[41px] h-[41px] flex justify-center items-center border ${
              bedroomsNum == "1" ? "border-[#021526]" : "border-[#808a93]"
            } rounded-[6px] mt-[24px]`} >
          <input type="number"
            onChange={(e) => {
              const value = e.target.value;
          
              // Limit to one digit and ensure it's between 1 and 9
              if (value.length > 1) {
                e.target.value = value.slice(0, 1); // Only keep the first digit
              }
          
              
            }}
            
            className="bg-transparent outline-none w-[8px] text-[#02152666] text-[17px]"
            ref={bedroomsRef}
          />
          </div>
        </div>
        <div className=" flex justify-end w-[100%] mt-[32px]">
          <button
            className="px-[14px] py-[8px] text-[14px] bg-[#f93b1d] rounded-[8px]  self-end "
            onClick={() => {
              setBedrooms(false);
              if ( bedroomsRef.current?.value && Number(bedroomsRef.current?.value) >= 1 && Number(bedroomsRef.current?.value) <= 9 ) {
                setBedroomsNum(bedroomsRef.current?.value);
                localStorage.setItem('BedroomsNum', bedroomsRef.current?.value);
                
              } else if (bedroomsRef.current?.value === "") {
                setBedroomsNum("");
                localStorage.setItem('BedroomsNum', "");
              }
              filter()
              
            }}
          >
            არჩევა
          </button>
        </div>
      </div>
    </>
  );
}

export default Bedrooms;
