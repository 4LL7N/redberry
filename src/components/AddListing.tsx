/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CityDataType, RegionDataType } from "../style";

import arrow from "/arrow.png";
import checked from "/chechked.png";
import checkedCorrect from "/checkedCorrect.png";
import checkedError from "/checkedError.png";
import addImage from "/addImage.png"
import deleteImage from "/deleteImage.png"

function AddListing() {
  const navigate = useNavigate();

  const [regionDropdown, setRegionDropdown] = useState<boolean>(false);
  const [cityDropdown, setCityDropdown] = useState<boolean>(false);

  const [deal, setDeal] = useState<string>("იყიდება");
  const [chosenRegion, setChosenRegion] = useState<string>("აფხაზეთი");
  const [chosenCity, setChosenCity] = useState<string>("სოხუმი");
  const [image,setImage] = useState<string>("noImage")
  const imageRef = useRef<HTMLInputElement|null>(null)


  const [regions, setRegions] = useState<RegionDataType[]>();
  const [cities, setCities] = useState<CityDataType[]>();

  const [citiesDropdownData,setCitiesDropdownData] = useState<CityDataType[]>()

  const [addressError, setAddressError] = useState<boolean>(false);
  const [zipError, setZipError] = useState<boolean>(false);
  const [priceError,setPriceError] = useState<boolean>(false)
  const [areaError,setAreaError] = useState<boolean>(false)
  const [bedroomError,setBedroomError] = useState<boolean>(false)
  const [descriptionError,setDescriptionError] = useState<boolean>(false)
  const [imageError,setImageError] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
// console.log(errors);

  const onError = (errors: any) => {
    if (errors.address) {
      setAddressError(true);
    }
    if (errors.zip) {
      setZipError(true);
    }
    if(errors.price){
        setPriceError(true)
    }
    if(errors.area){
        setAreaError(true)
    }
    if(errors.bedroom){
        setBedroomError(true)
    }
    if(errors.description){
        setDescriptionError(true)
    }
    console.log(errors);
  };

  useEffect(() => {
    let regionsForCities:RegionDataType[]=[];
      const fetchRegionsData = async () => {
          try {
              const response = await fetch(
                  "https://api.real-estate-manager.redberryinternship.ge/api/regions",
                  {
                      method: "GET",
                      headers: {
                          "Content-Type": "application/json",
                        },
                    }
                );
                const regionsData = await response.json();
                setRegions(regionsData);
                regionsForCities = regionsData
            } catch (err) {
                console.log("Error", err);
            }
        };
        fetchRegionsData();
        const fetchCitiesData = async () => {
            try {
                const response = await fetch(
              "https://api.real-estate-manager.redberryinternship.ge/api/cities",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                    },
                }
            );
            let citiesData = await response.json();
            setCities(citiesData);
            citiesData = citiesData.filter((item:CityDataType)=>{
                let Region:any = localStorage.getItem("chosenRegion")
                Region = regionsForCities.find((item:RegionDataType)=>{ if(Region){return item.name == Region}else{return item.name == chosenRegion }})
                return item.region_id == Region.id
            })            
            setCitiesDropdownData(citiesData)            
        } catch (err) {
            console.log("Error", err);
        }
    };
    fetchCitiesData();
        
    const address = localStorage.getItem("address");
    if (address) setValue("address", address);

    const zip = localStorage.getItem("zip");
    if (zip) setValue("zip", zip);

    const Region = localStorage.getItem("chosenRegion")
    if(Region)setChosenRegion(Region);

    const City = localStorage.getItem("chosenCity")
    if(City)setChosenCity(City)

    const Price = localStorage.getItem("price")
    if(Price)setValue('price',Price)

    const Area = localStorage.getItem("area");
    if(Area)setValue('area',Area)

    const Bedroom = localStorage.getItem("bedroom")
    if(Bedroom)setValue('bedroom',Bedroom)

    const Description = localStorage.getItem("description")
    if(Description)setValue("description",Description)

    let Image:any = localStorage.getItem("image")
    Image = JSON.parse(Image)
    if(Image){setImage(Image);setImageError(false)}
    if(Image == "")setImageError(true)
  }, []);

  const handleRegion = (Region:RegionDataType) =>{
    setRegionDropdown(false);
    setChosenRegion(Region.name);
    localStorage.setItem("chosenRegion",Region.name)    
    const citiesData = cities?.filter((item:CityDataType)=>{return item.region_id == Region.id})    
    if(citiesData){setCitiesDropdownData(citiesData)
        setChosenCity(citiesData[0].name)
        localStorage.setItem("chosenCity",citiesData[0].name)
    }
  }

  const handleImage = (e) => {
    const selectedFile = e.target.files[0]
    console.log(selectedFile);
    
    const Objurl = URL.createObjectURL(selectedFile)
    console.log(Objurl);
    setImage(Objurl)
    setImageError(false)
    
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      
    
      const as = async () =>{
        try{
            const base64Image = await toBase64(selectedFile)
        console.log(base64Image);
        }catch(err){
            console.log(err);
            
        }
      }
      as()
  }

  useEffect(() => {
    if (watch("address").length < 2 && watch("address") != "") {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
    localStorage.setItem("address", watch("address"));
  }, [watch("address")]);

  useEffect(() => {
    const zip = watch("zip");
    if (/^[0-9]+$/.test(zip) || zip == "") {
        setZipError(false);
    } else {
      setZipError(true);
    }
    localStorage.setItem("zip", watch("zip"));
  }, [watch("zip")]);

  useEffect(() => {
    const price = watch("price");
    if (/^[0-9]+$/.test(price) || price == "") {
        setPriceError(false);
    } else {
        setPriceError(true);
    }
    localStorage.setItem("price", watch("price"));
  }, [watch("price")]);

  useEffect(() => {
    const area = watch("area");
    if (/^[0-9]+$/.test(area) || area == "") {
        setAreaError(false);
    } else {
        setAreaError(true);
    }
    localStorage.setItem("area", watch("area"));
  }, [watch("area")]);

  useEffect(() => {
    const bedroom = watch("bedroom");
    if (/^[0-9]+$/.test(bedroom) || bedroom == "") {
        setBedroomError(false);
    } else {
        setBedroomError(true);
    }
    localStorage.setItem("bedroom", watch("bedroom"));
  }, [watch("bedroom")]);

  useEffect(() => {
    const description = watch("description");
    if (/(?:\b\w+\b[\s]*){5,}/.test(description) || description == "") {
        setDescriptionError(false);
    } else {
        setDescriptionError(true);
    }
    localStorage.setItem("description", watch("description"));
  }, [watch("description")]);
  useEffect(() => {
    if(image != 'noImage'){
        localStorage.setItem("image", JSON.stringify(image));
    }
  }, [image]);

  return (
    <section className="pb-[228px]">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-[788px]">
        <div className="w-[100%] flex justify-center">
          <h1 className="text-[32px] text-[#021526] font-medium ">
            ლისტინგის დამატება
          </h1>
        </div>
        <div className="mt-[61px]">
          <h3 className="text-[16px] text-[#1a1a1f] font-medium mb-[8px] ">
            გარიგების ტიპი
          </h3>
          <div className="flex gap-[84px] max-h-[17px] ">
            <div className="flex gap-[7px] ">
              <input
                type="radio"
                value="იყიდება"
                className="w-[17px] h-[17px] bg-transparent absolute appearance-none "
                {...register("dealType")}
                onClick={() => setDeal("იყიდება")}
                checked
              />
              <div
                className="w-[17px] h-[17xp] flex items-center justify-center border border-black rounded-[50%] "
                onClick={() => setDeal("იყიდება")}
              >
                <div
                  className={` bg-black w-[7px] h-[7px] rounded-[50%] ${
                    deal == "იყიდება" ? "" : "hidden"
                  } `}
                />
              </div>
              <label className=" text-[14px] text-[#021526]" htmlFor="იყიდება">
                იყიდება
              </label>
            </div>
            <div className="flex gap-[7px] ">
              <input
                type="radio"
                value="ქირავდება"
                {...register("dealType")}
                className="w-[17px] h-[17px] bg-transparent absolute appearance-none "
                onClick={() => setDeal("ქირავდება")}
              />
              <div
                className="w-[17px] h-[17xp] flex items-center justify-center border border-black rounded-[50%] "
                onClick={() => setDeal("ქირავდება")}
              >
                <div
                  className={` bg-black w-[7px] h-[7px] rounded-[50%] ${
                    deal == "ქირავდება" ? "" : "hidden"
                  }  `}
                />
              </div>
              <label
                htmlFor="ქირავდება"
                className=" text-[14px] text-[#021526]"
              >
                ქირავდება
              </label>
            </div>
          </div>
        </div>
        <div className="mt-[80px]">
          <h2 className="text-[16px] text-[#021526] font-medium mb-[22px] ">
            მდებარეობა
          </h2>
          <div className="flex gap-[20px] ">
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
                მისამართი *
              </h3>
              <div
                className={`  border ${
                  addressError
                    ? "border-[#F93B1D]"
                    : !watch("address")
                    ? "border-[#808a93]"
                    : "border-[#45A849]"
                }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
              >
                <input
                  type="text"
                  {...register("address", { required: true, minLength: 2 })}
                  className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
                />
              </div>
              <div className="flex items-center gap-[7px] mt-[4px]">
                <img
                  className="w-[12px] h-[11px] "
                  src={
                    addressError
                      ? checkedError
                      : !watch("address")
                      ? checked
                      : checkedCorrect
                  }
                  alt=""
                />
                <p
                  className={`text-[14px] ${
                    addressError
                      ? "text-[#F93B1D]"
                      : !watch("address")
                      ? "text-[#021526]"
                      : "text-[#45A849]"
                  } `}
                >
                  მინიმუმ ორი სიმბოლო
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
                საფოსტო ინდექსი *
              </h3>
              <div
                className={`  border ${
                  zipError
                    ? "border-[#F93B1D]"
                    : !watch("zip")
                    ? "border-[#808a93]"
                    : "border-[#45A849]"
                }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
              >
                <input
                  type="text"
                  {...register("zip", { required: true ,pattern:/^[0-9]+$/})}
                  className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
                />
              </div>
              <div className="flex items-center gap-[7px] mt-[4px]">
                <img
                  className="w-[12px] h-[11px] "
                  src={
                    zipError
                      ? checkedError
                      : !watch("zip")
                      ? checked
                      : checkedCorrect
                  }
                  alt=""
                />
                <p
                  className={`text-[14px] ${
                    zipError
                      ? "text-[#F93B1D]"
                      : !watch("zip")
                      ? "text-[#021526]"
                      : "text-[#45A849]"
                  } `}
                >
                  მხოლოდ რიცხვები
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-[20px] mt-[20px] ">
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
                რეგიონი
              </h3>
              <div className="relative">
                <div
                  onClick={() => {
                    setRegionDropdown(!regionDropdown);
                  }}
                  className={`  border border-[#808a93] p-[10px] ${
                    regionDropdown ? "rounded-t-[6px]" : "rounded-[6px]"
                  } h-[42px] w-[384px] flex justify-between items-center  `}
                >
                  <p className=" text-[14px] text-[#021526]">{chosenRegion}</p>
                  <img
                    src={arrow}
                    alt="arrow"
                    className={`w-[14px] h-[14px]  transition-transform duration-500 ${
                      regionDropdown ? " rotate-180" : ""
                    } `}
                  />
                </div>
                <div
                  className={` h-[168px] overflow-y-scroll  gap-[3px] border-x border-b border-b-[#808a93] border-x-[#808a93] rounded-b-[6px] bg-[#fff] w-[384px] absolute top-[42px] left-[0px] ${
                    regionDropdown ? "" : "hidden"
                  } `}
                >
                  {regions &&
                    regions.map((item: RegionDataType, i: number) => {
                      return (
                        <div
                          key={i}
                          className={` cursor-pointer p-[10px] ${
                            regions.length == i
                              ? ""
                              : "border-b border-b-[#808a93]"
                          } w-[100%] text-[14px] text-[#021526] `}
                          onClick={() => {
                            handleRegion(item)
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
                ქალაქი
              </h3>
              <div className="relative">
              <div
              onClick={()=>{
                setCityDropdown(!cityDropdown)
              }}
                className={` border border-[#808a93]  h-[42px] w-[384px] p-[10px] rounded-[6px] flex justify-between items-center  `}
              >
                <p  className=" text-[14px] text-[#021526]" >{chosenCity}</p>
                <img src={arrow} alt="arrow" className={`w-[14px] h-[14px]  transition-transform duration-500 ${
                      cityDropdown ? " rotate-180" : ""
                    } `}  />
              </div>
              <div
                  className={` max-h-[168px] overflow-y-scroll  gap-[3px] border-x border-b border-b-[#808a93] border-x-[#808a93] rounded-b-[6px] bg-[#fff] w-[384px] absolute top-[42px] left-[0px] ${
                    cityDropdown ? "" : "hidden"
                  } `}
                >
                  {citiesDropdownData &&
                    citiesDropdownData.map((item: CityDataType, i: number) => {
                      return (
                        <div
                          key={i}
                          className={` cursor-pointer p-[10px] ${
                            citiesDropdownData.length == i
                              ? ""
                              : "border-b border-b-[#808a93]"
                          } w-[100%] text-[14px] text-[#021526] `}
                          onClick={() => {
                            setCityDropdown(false);
                            setChosenCity(item.name)
                            localStorage.setItem("chosenCity",item.name)
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[101px]">
          <h2 className="text-[16px] text-[#021526] font-medium mb-[22px] ">
          ბინის დეტალები
          </h2>
          <div className="flex gap-[20px] ">
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
              ფასი
              </h3>
              <div
                className={`  border ${
                    priceError
                    ? "border-[#F93B1D]"
                    : !watch("price")
                    ? "border-[#808a93]"
                    : "border-[#45A849]"
                }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
              >
                <input
                  type="text"
                  {...register("price",{pattern:/^[0-9]+$/})}
                  className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
                />
              </div>
              <div className="flex items-center gap-[7px] mt-[4px]">
                <img
                  className="w-[12px] h-[11px] "
                  src={
                    priceError
                      ? checkedError
                      : !watch("price")
                      ? checked
                      : checkedCorrect
                  }
                  alt=""
                />
                <p
                  className={`text-[14px] ${
                    priceError
                      ? "text-[#F93B1D]"
                      : !watch("price")
                      ? "text-[#021526]"
                      : "text-[#45A849]"
                  } `}
                >
                  მხოლოდ რიცხვები
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
              ფართობი
              </h3>
              <div
                className={`  border ${
                  areaError
                    ? "border-[#F93B1D]"
                    : !watch("area")
                    ? "border-[#808a93]"
                    : "border-[#45A849]"
                }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
              >
                <input
                  type="text"
                  {...register("area",{pattern:/^[0-9]+$/})}
                  className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
                />
              </div>
              <div className="flex items-center gap-[7px] mt-[4px]">
                <img
                  className="w-[12px] h-[11px] "
                  src={
                    areaError
                      ? checkedError
                      : !watch("area")
                      ? checked
                      : checkedCorrect
                  }
                  alt=""
                />
                <p
                  className={`text-[14px] ${
                    areaError
                      ? "text-[#F93B1D]"
                      : !watch("area")
                      ? "text-[#021526]"
                      : "text-[#45A849]"
                  } `}
                >
                  მხოლოდ რიცხვები
                </p>
              </div>
            </div>
          </div>
            <div>
              <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] mt-[20px] ">
              საძინებლების რაოდენობა*
              </h3>
              <div
                className={`  border ${
                  bedroomError
                    ? "border-[#F93B1D]"
                    : !watch("bedroom")
                    ? "border-[#808a93]"
                    : "border-[#45A849]"
                }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
              >
                <input
                  type="text"
                  {...register("bedroom",{required:true,pattern:/^[0-9]+$/})}
                  className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
                />
              </div>
              <div className="flex items-center gap-[7px] mt-[4px]">
                <img
                  className="w-[12px] h-[11px] "
                  src={
                    bedroomError
                      ? checkedError
                      : !watch("bedroom")
                      ? checked
                      : checkedCorrect
                  }
                  alt=""
                />
                <p
                  className={`text-[14px] ${
                    bedroomError
                      ? "text-[#F93B1D]"
                      : !watch("bedroom")
                      ? "text-[#021526]"
                      : "text-[#45A849]"
                  } `}
                >
                  მხოლოდ რიცხვები
                </p>
              </div>
          </div>
          <div  >
          <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] mt-[20px] ">
          აღწერა *
              </h3>
              <div className={` w-[100%] h-[135px] mt-[5px] resize-none bg-[#fff] border text-[16px] text-[#021526] ${
                        descriptionError
                          ? "border-[#F93B1D]"
                          : !watch("description")
                          ? "border-[#808a93]"
                          : "border-[#45A849]"
                      } rounded-[6px] p-[10px] `}>
                <textarea
                className=" w-[100%] h-[100%] bg-transparent outline-none "
                {...register('description',{required:true,pattern:/(?:\b\w+\b[\s]*){5,}/})}
                    
                  />
                  </div>
                  <div className="flex items-center gap-[7px] mt-[4px]">
                <img
                  className="w-[12px] h-[11px] "
                  src={
                    descriptionError
                      ? checkedError
                      : !watch("description")
                      ? checked
                      : checkedCorrect
                  }
                  alt=""
                />
                <p
                  className={`text-[14px] ${
                    descriptionError
                      ? "text-[#F93B1D]"
                      : !watch("description")
                      ? "text-[#021526]"
                      : "text-[#45A849]"
                  } `}
                >
                  მინიმუმ ხუთი სიტყვა
                </p>
              </div>
          </div>
          <div className="relative">
          <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] mt-[20px] ">
          ატვირთეთ ფოტო *
              </h3>
              <div className={`mt-[10px] w-[100%] h-[120px] rounded-[8px] border border-dashed ${imageError?"border-[#F93B1D]":image  == "noImage"?"border-[#2d3648]":"border-[#45A849]"} flex items-center justify-center `} onClick={()=>{if(imageRef.current)imageRef.current.click()}} >
              <input {...register('image',{required:true})} ref={imageRef} onChange={(e)=>{handleImage(e)}} 
                style={{ display: "none" }} type="file" id="fileUpload" name="fileUpload"  accept="image/*" />
                <div className="w-[92px] h-[82px] flex justify-center items-center " >
              <img src={!image || image == "noImage"? addImage:image} className={!image || image == "noImage"?"":" rounded-[4px] w-[92px] h-[82px]"} alt="" />
              </div>
              </div>
              <img src={deleteImage} className={!image || image == "noImage" ? "hidden" :"w-[24px] h-[24px] absolute top-[115px] left-[425px] "}  alt="delete image" onClick={()=>{setImage('');setImageError(true);if(imageRef.current)imageRef.current.value = ""}} />
          </div>
        </div>
        <div className="flex gap-[15px] mt-[90px]">
          <button
            className="rounded-[10px] border border-[#f93b1d] text-[#f93b1d] text-[16px] py-[14px] px-[16px]"
            onClick={() => {
              localStorage.setItem("address", "");
              navigate("/");
            }}
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className=" rounded-[10px] bg-[#f93b1d] hover:bg-[#DF3014] py-[14px] px-[16px] text-[16px] text-[#fff] font-medium "
          >
            დამატება ლისტინგის
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddListing;
