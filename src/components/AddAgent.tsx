/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react";
import { RealEstateContext } from "../App";
import { SubmitHandler, useForm } from "react-hook-form";

import checked from "/chechked.png";
import checkedCorrect from "/checkedCorrect.png";
import checkedError from "/checkedError.png";
import addImage from "/addImage.png";
import deleteImage from "/deleteImage.png";
import axios from "axios";
import { addAgentType } from "../style";

function AddAgent() {
  const context = useContext(RealEstateContext);
  const { register, handleSubmit, watch,setValue } = useForm<addAgentType>();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("noImage");
  const [apiImage, setApiImage] = useState<string>();

  const [nameError, setNameError] = useState<boolean>(false);
  const [surnameError, setSurnameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const onSubmit:SubmitHandler<addAgentType> = (data) => {    
    if (image && image != "noImage" && apiImage) {
      const formDate = new FormData();
      formDate.append("avatar", apiImage);
      formDate.append('name',data.name)
      formDate.append('phone',data.phone)
      formDate.append('surname',data.surname)
      formDate.append('email',data.email)
        
      const postAgent = async () => {
        try {
          const response = await axios.post(
            "https://api.real-estate-manager.redberryinternship.ge/api/agents",
            formDate,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer 9d06971e-aaca-4a8e-a40d-e6d89286772c",
              },
            }
          );
          if(response.status == 201){
                setValue('name','')
                setValue('phone','')
                setValue('surname','')
                setValue('email','')
                setImage("noImage");
              setApiImage('')
              if (imageRef.current) imageRef.current.value = "";
              context?.setAddAgent(false);
              localStorage.setItem("addAgent", "false");
          }
        } catch (error:any) {
          console.error(error.message);
        }
      };
      postAgent()
    }    
  };

  const onError:any = (errors:any) => {
    if (errors.name) {
      setNameError(true);
    }
    if (errors.surname) {
      setSurnameError(true);
    }
    if (errors.email) {
      setEmailError(true);
    }
    if (errors.phone) {
      setPhoneError(true);
    }
    if (!image || !apiImage || image == "noImage") {
      setImageError(true);
    }
    console.log(errors);
  };

  const handleImage = (e: any) => {
    const selectedFile = e.target.files[0];
    setApiImage(selectedFile);

    const Objurl = URL.createObjectURL(selectedFile);

    // const selectedFile = e.target.files[0];
    // const fileReader: any = new FileReader();

    // fileReader.addEventListener("load", () => {
    //   console.log(fileReader.result);
    //   localStorage.setItem("apiImage", fileReader.result);
    // });

    // fileReader.readAsDataURL(selectedFile);

    setImage(Objurl);
    setImageError(false);
  };

  const startsWithFive = (value:string) => {
    const pattern = /^[0-9]+$/;
    return value.startsWith('5') && pattern.test(value) || "The value must start with 5 and contain only digits";
  };

//   useEffect(() => {
//     const Name = localStorage.getItem("name");
//     if (Name) setValue("name", Name);

//     const Surname = localStorage.getItem("surname");
//     if (Surname) setValue("surname", Surname);

//     const Email = localStorage.getItem("email");
//     if (Email) setValue("email", Email);

//     const Phone = localStorage.getItem("phone");
//     if (Phone) setValue("phone", Phone);

//     let Image: any = localStorage.getItem("image");
//     if (Image) {
//       Image = JSON.parse(Image);
//       setImage(Image);
//       setImageError(false);
//     }

//     const base64Image = localStorage.getItem("apiImage");

//     function base64ToFile(base64String: string | null, fileName: string) {
//       const arr: any = base64String?.split(",");
//       const mime = arr[0].match(/:(.*?);/)[1];
//       const bstr = atob(arr[1]);
//       let n = bstr.length;
//       const u8arr = new Uint8Array(n);

//       while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//       }

//       return new File([u8arr], fileName, { type: mime });
//     }

//     let file: any;
//     if (base64Image) {
//       file = base64ToFile(base64Image, "image.png");
//     } else {
//       file = "";
//     }
//     setApiImage(file);
//   }, []);

  useEffect(() => {
    if (watch("name").length < 2 && watch("name") != "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [watch("name")]);

  useEffect(() => {
    if (watch("surname").length < 2 && watch("surname") != "") {
      setSurnameError(true);
    } else {
      setSurnameError(false);
    }
  }, [watch("surname")]);

  useEffect(() => {
    const Mail = watch("email");
    if (/@redberry\.ge$/.test(Mail) || Mail == "") {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }, [watch("email")]);

  useEffect(() => {
    const Phone = watch("phone");
    console.log(Phone.split('').length == 9);
    
    if (/^[0-9]+$/.test(Phone) && Phone.split('').length == 9 && Phone.startsWith('5')) {
            setPhoneError(false);
    } else {
        if(Phone == ""){   
            setPhoneError(false);
        }else{
            setPhoneError(true);
        }
    }
  }, [watch("phone")]);


  useEffect(() => {
    const locAddAgent = localStorage.getItem("addAgent");
    if (locAddAgent == "false") {
      setValue('name','')
                setValue('phone','')
                setValue('surname','')
                setValue('email','')
                setImage("noImage");
              setApiImage('')
              if (imageRef.current) imageRef.current.value = "";
              context?.setAddAgent(false);
              localStorage.setItem("addAgent", "false");
    }
  }, [context?.addAgent]);

  //   console.log(imageError);
  //   console.log(image);

  return (
    <div
      className={` bg-white rounded-[20px] w-[1009px] z-[2] flex flex-col items-center  px-[105px] py-[87px] absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        context?.addAgent ? "" : "hidden"
      } `}
    >
      <h1 className="text-[#021526] text-[32px] font-medium ">
        აგენტის დამატება
      </h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-[61px]">
        <div className="flex gap-[31px]">
          <div>
            <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
              სახელი *
            </h3>
            <div
              className={`  border ${
                nameError
                  ? "border-[#F93B1D]"
                  : !watch("name")
                  ? "border-[#808a93]"
                  : "border-[#45A849]"
              }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
            >
              <input
                type="text"
                {...register("name", { required: true, minLength: 2 })}
                className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
              />
            </div>
            <div className="flex items-center gap-[7px] mt-[4px]">
              <img
                className="w-[12px] h-[11px] "
                src={
                  nameError
                    ? checkedError
                    : !watch("name")
                    ? checked
                    : checkedCorrect
                }
                alt=""
              />
              <p
                className={`text-[14px] ${
                  nameError
                    ? "text-[#F93B1D]"
                    : !watch("name")
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
              გვარი
            </h3>
            <div
              className={`  border ${
                surnameError
                  ? "border-[#F93B1D]"
                  : !watch("surname")
                  ? "border-[#808a93]"
                  : "border-[#45A849]"
              }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
            >
              <input
                type="text"
                {...register("surname", { required: true, minLength: 2 })}
                className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
              />
            </div>
            <div className="flex items-center gap-[7px] mt-[4px]">
              <img
                className="w-[12px] h-[11px] "
                src={
                  surnameError
                    ? checkedError
                    : !watch("surname")
                    ? checked
                    : checkedCorrect
                }
                alt=""
              />
              <p
                className={`text-[14px] ${
                  surnameError
                    ? "text-[#F93B1D]"
                    : !watch("surname")
                    ? "text-[#021526]"
                    : "text-[#45A849]"
                } `}
              >
                მინიმუმ ორი სიმბოლო
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-[31px] mt-[28px]">
          <div>
            <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
              ელ-ფოსტა *
            </h3>
            <div
              className={`  border ${
                emailError
                  ? "border-[#F93B1D]"
                  : !watch("email")
                  ? "border-[#808a93]"
                  : "border-[#45A849]"
              }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
            >
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: /@redberry\.ge$/,
                })}
                className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
              />
            </div>
            <div className="flex items-center gap-[7px] mt-[4px]">
              <img
                className="w-[12px] h-[11px] "
                src={
                  emailError
                    ? checkedError
                    : !watch("email")
                    ? checked
                    : checkedCorrect
                }
                alt=""
              />
              <p
                className={`text-[14px] ${
                  emailError
                    ? "text-[#F93B1D]"
                    : !watch("email")
                    ? "text-[#021526]"
                    : "text-[#45A849]"
                } `}
              >
                გამოიყენეთ @redberry.ge ფოსტა
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] ">
              ტელეფონის ნომერი
            </h3>
            <div
              className={`  border ${
                phoneError
                  ? "border-[#F93B1D]"
                  : !watch("phone")
                  ? "border-[#808a93]"
                  : "border-[#45A849]"
              }  p-[10px] rounded-[6px] w-[384px] h-[42px] `}
            >
              <input
                type="text"
                {...register("phone", { required: true,minLength:9,maxLength:9,validate:startsWithFive })}
                className="text-[16px] text-[#021526] bg-transparent outline-none w-[100%] "
              />
            </div>
            <div className="flex items-center gap-[7px] mt-[4px]">
              <img
                className="w-[12px] h-[11px] "
                src={
                  phoneError
                    ? checkedError
                    : !watch("phone")
                    ? checked
                    : checkedCorrect
                }
                alt=""
              />
              <p
                className={`text-[14px] ${
                  phoneError
                    ? "text-[#F93B1D]"
                    : !watch("phone")
                    ? "text-[#021526]"
                    : "text-[#45A849]"
                } `}
              >
                მხოლოდ რიცხვები
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <h3 className="text-[14px] text-[#021526] font-medium mb-[5px] mt-[20px] ">
            ატვირთეთ ფოტო *
          </h3>
          <div
            className={`mt-[10px] w-[100%] h-[120px] rounded-[8px] border border-dashed ${
              imageError
                ? "border-[#F93B1D]"
                : image == "noImage"
                ? "border-[#2d3648]"
                : "border-[#45A849]"
            } flex items-center justify-center `}
            onClick={() => {
              if (imageRef.current) imageRef.current.click();
            }}
          >
            <input
              ref={imageRef}
              onChange={(e) => {
                handleImage(e);
              }}
              style={{ display: "none" }}
              type="file"
              id="fileUpload"
              name="fileUpload"
              accept="image/*"
            />
            <div className="w-[92px] h-[82px] flex justify-center items-center ">
              <img
                src={!image || image == "noImage" ? addImage : image}
                className={
                  !image || image == "noImage"
                    ? ""
                    : " rounded-[4px] w-[92px] h-[82px]"
                }
                alt=""
              />
            </div>
          </div>
          <img
            src={deleteImage}
            className={
              !image || image == "noImage"
                ? "hidden"
                : "w-[24px] h-[24px] absolute top-[115px] left-[425px] "
            }
            alt="delete image"
            onClick={() => {
              setImage("noImage");
              setApiImage('')
              setImageError(true);
              if (imageRef.current) imageRef.current.value = "";
            }}
          />
        </div>
        <div className="flex justify-end gap-[15px] mt-[90px]">
          <div
            className="rounded-[10px] border border-[#f93b1d] text-[#f93b1d] text-[16px] py-[14px] px-[16px]"
            onClick={() => {
              setValue('name','')
                setValue('phone','')
                setValue('surname','')
                setValue('email','')
                setImage("noImage");
              setApiImage('')
              if (imageRef.current) imageRef.current.value = "";
              context?.setAddAgent(false);
              localStorage.setItem("addAgent", "false");;
            }}
          >
            გაუქმება
          </div>
          <button
            type="submit"
            className=" rounded-[10px] bg-[#f93b1d] hover:bg-[#DF3014] py-[14px] px-[16px] text-[16px] text-[#fff] font-medium "
          >
            დამატება ლისტინგის
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAgent;
