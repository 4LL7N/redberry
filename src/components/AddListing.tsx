/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import checked from '/chechked.png'
import checkedCorrect from '/checkedCorrect.png'
import checkedError from '/checkedError.png'
import { useNavigate } from "react-router-dom";

function AddListing() {
    const navigate = useNavigate()

    const[deal,setDeal] = useState<string>("იყიდება")

    const [addressError,setAddressError] = useState<boolean>(false)
    const [zipError,setZipError] =  useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (errors:any) => {
    if(errors.address){
        setAddressError(true)
    }
    if(errors.zip){
        setZipError(true)
    }
    console.log(errors);
  };

  useEffect(()=>{
    const address = localStorage.getItem('address')    
    if(address)setValue('address',address)

    const zip = localStorage.getItem('zip')
    if(zip)setValue('zip',zip)
  },[])

  useEffect(()=>{
    if(watch('address').length < 2 && watch('address') != "" ){
        setAddressError(true)
    }else{
        setAddressError(false)
    }
    localStorage.setItem('address',watch('address'))
  },[watch('address')])

    useEffect(()=>{
    const zip = watch('zip')    
    console.log(zip);
    
    if(/^[0-9]+$/.test(zip) || zip == "" ){
        setZipError(false)
    }else{
        setZipError(true)        
    }
    localStorage.setItem('zip',watch('zip'))
  },[watch('zip')])
  

  
  return (
    <section className="pb-[228px]">
      <form onSubmit={handleSubmit(onSubmit,onError)} className="w-[790px]" >
        <div className="w-[100%] flex justify-center" >
        <h1 className="text-[32px] text-[#021526] font-medium ">
          ლისტინგის დამატება
        </h1>
        </div>
        <div className="mt-[61px]" >
          <h3 className="text-[16px] text-[#1a1a1f] font-medium mb-[8px] ">
            გარიგების ტიპი
          </h3>
          <div className="flex gap-[84px] max-h-[17px] " >
            <div className="flex gap-[7px] " >                
              <input
                type="radio"
               value="იყიდება"
                className="w-[17px] h-[17px] bg-transparent absolute appearance-none " 
                {...register("dealType")}
                onClick={()=>setDeal('იყიდება')}
                checked
              />
              <div className="w-[17px] h-[17xp] flex items-center justify-center border border-black rounded-[50%] "  onClick={()=>setDeal('იყიდება')} >
                <div className={` bg-black w-[7px] h-[7px] rounded-[50%] ${deal=="იყიდება"?"":"hidden"} `} />
              </div>
              <label className=" text-[14px] text-[#021526]" htmlFor="იყიდება">იყიდება</label>
            </div>
            <div  className="flex gap-[7px] ">
              <input
                type="radio"
                value="ქირავდება"
                {...register('dealType')}
                className="w-[17px] h-[17px] bg-transparent absolute appearance-none " 
                onClick={()=>setDeal('ქირავდება')}
              />
              <div className="w-[17px] h-[17xp] flex items-center justify-center border border-black rounded-[50%] "  onClick={()=>setDeal('ქირავდება')} >
                <div className={` bg-black w-[7px] h-[7px] rounded-[50%] ${deal=="ქირავდება"?"":"hidden"}  `} />
              </div>
              <label htmlFor="ქირავდება"  className=" text-[14px] text-[#021526]"  >ქირავდება</label>
            </div>
          </div>
        </div>
        <div className="mt-[80px]" >
            <h2 className="text-[16px] text-[#021526] font-medium mb-[22px] ">
                მდებარეობა
            </h2>
            <div className="flex gap-[20px] " >
                <div>
                    <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] " >მისამართი *</h3>
                    <div className={`  border ${addressError?"border-[#F93B1D]":!watch('address') ?"border-[#808a93]":"border-[#45A849]"}  p-[10px] rounded-[6px] `} >
                        <input type="text" {...register('address',{required:true,minLength:2})} className="text-[16px] text-[#021526] bg-transparent outline-none " />
                    </div>
                    <div className="flex items-center gap-[7px] mt-[4px]" >
                    <img className="w-[12px] h-[11px] "  src={addressError?checkedError:!watch('address')?checked:checkedCorrect} alt="" />
                    <p className={`text-[14px] ${addressError?"text-[#F93B1D]":!watch('address')?"text-[#021526]":"text-[#45A849]"} `}>მინიმუმ ორი სიმბოლო</p>
                    </div>
                </div>
                <div><h3 className="text-[14px] text-[#021526] font-medium mb-[5px] " >საფოსტო ინდექსი *</h3>
                    <div className={`  border ${zipError?"border-[#F93B1D]":!watch('zip') ?"border-[#808a93]":"border-[#45A849]"}  p-[10px] rounded-[6px] `} >
                        <input type="text" {...register('zip',{required:true})} className="text-[16px] text-[#021526] bg-transparent outline-none " />
                    </div>
                    <div className="flex items-center gap-[7px] mt-[4px]" >
                    <img className="w-[12px] h-[11px] "  src={zipError?checkedError:!watch('zip')?checked:checkedCorrect} alt="" />
                    <p className={`text-[14px] ${zipError?"text-[#F93B1D]":!watch('zip')?"text-[#021526]":"text-[#45A849]"} `}>მხოლოდ რიცხვები</p>
                    </div></div>
            </div>
        </div>
        <div className="flex gap-[15px] mt-[90px]" > 
        <button className="rounded-[10px] border border-[#f93b1d] text-[#f93b1d] text-[16px] py-[14px] px-[16px]" onClick={()=>{localStorage.setItem('address',"");navigate('/')}} >
          გაუქმება
        </button>
        <button type="submit" className=" rounded-[10px] bg-[#f93b1d] hover:bg-[#DF3014] py-[14px] px-[16px] text-[16px] text-[#fff] font-medium "  >
          დამატება ლისტინგის
        </button>
        </div>
      </form>
    </section>
  );
}

export default AddListing;
