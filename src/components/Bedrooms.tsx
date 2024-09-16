import { BedroomsType } from "../style";

function Bedrooms({
  bedrooms,
  setBedrooms,
  bedroomsNum,
  setBedroomsNum,
}: BedroomsType) {
  return (
    <>
      <div
        className={`absolute left-[555px] top-[57px] p-[24px] w-[382px] bg-[#ffff] border border-[#dbdbdb] rounded-[10px] ${
          bedrooms ? "" : "hidden"
        } `}
      >
        <h1 className="text-[16px] text-[#021526] font-bold ">
          საძინებლების რაოდენობა
        </h1>
        <div className="flex gap-[8px] ">
          <button
            className={`w-[41px] h-[41px] flex justify-center items-center border ${
              bedroomsNum == "1" ? "border-[#021526]" : "border-[#808a93]"
            } rounded-[6px] mt-[24px]`}
            onClick={() => {
                if(bedroomsNum == "1" ){
                    setBedroomsNum("");
                }else if(bedroomsNum == ""){
                    setBedroomsNum("1") 
                }
            }}
          >
            <p
              className={`text-[14px] ${
                bedroomsNum ? "text-[#021526]" : "text-[#808a93]"
              } `}
            >
              1
            </p>
          </button>
          <button
            className={`w-[41px] h-[41px] flex justify-center items-center border ${
              bedroomsNum == "2" ? "border-[#021526]" : "border-[#808a93]"
            } rounded-[6px] mt-[24px]`}
            onClick={() => {
                if(bedroomsNum == "2" ){
                    setBedroomsNum("");
                }else if(bedroomsNum == ""){
                    setBedroomsNum("2") 
                }
            }}
          >
            <p
              className={`text-[14px] ${
                bedroomsNum ? "text-[#021526]" : "text-[#808a93]"
              } `}
            >
              2
            </p>
          </button>
        </div>
        <div className=" flex justify-end w-[100%] mt-[32px]">
          <button
            className="px-[14px] py-[8px] text-[14px] bg-[#f93b1d] rounded-[8px]  self-end "
            onClick={() => {
              setBedrooms(false);
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
