/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react";
import goBack from "/goBack.png";
import right from "/rightArrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { ListingType, RealEstate } from "../style";
import location from "/location.png";
import bed from "/bed.png";
import areaIcon from "/area.png";
import zip from "/zip.png";
import phone from "/phone.png";
import email from "/email.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RealEstateContext } from "../App";

function Listing() {
  const [listing, setListing] = useState<ListingType>();
  const params = useParams();

  const [carouselArr, setCarouselArr] = useState<RealEstate[]>();

  const sliderRef = useRef<any>();

  const navigate = useNavigate();

  const context = useContext(RealEstateContext)
    
    
  

  useEffect(() => {
    let data: ListingType;
    const fetchData = async () => {
      const url = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${params.listing} `;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer 9d06971e-aaca-4a8e-a40d-e6d89286772c",
            "Content-Type": "application/json",
          },
        });
        data = await response.json();
        setListing(data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();

    const fetchCarouselData = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer 9d06971e-aaca-4a8e-a40d-e6d89286772c",
              "Content-Type": "application/json",
            },
          }
        );
        let carouselData = await response.json();

        setTimeout(() => {
          carouselData = carouselData.filter((item: RealEstate) => {
            return item.city.region.name == data.city.region.name && item.id !=  data.id;
          });

          setCarouselArr(carouselData);
        }, 500);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchCarouselData();
  }, [params.listing]);

  let date: Date | null | string | undefined = listing?.created_at
    ? new Date(listing?.created_at)
    : null;
  date = date?.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    style: { outline: "none" },
    horizontal: true,
  };

  return (
    <>
      <section className="w-[1596px] pb-[228px] ">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={goBack} alt="goBack" />
        </div>
        <main className=" mt-[29px] flex gap-[68px] ">
          <div>
            <img
              src={listing?.image}
              alt="house image"
              className="w-[839px] h-[670px] rounded-t-[14px] "
            />
            <div className="w-[100%] flex justify-end gap-[10px] mt-[11px] ">
              <p className="text-[16px] text-[#808a93]  ">
                გამოქვეყნების თარიღი
              </p>
              <p className="text-[16px] text-[#808a93] ">{date}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between pb-[35px] ">
            <div>
              <h1 className="mt-[30px] text-[48px] text-[#021526] font-bold ">
                {listing?.price}₾
              </h1>
              <div className="flex flex-col gap-[16px] mt-[24px] ">
                <div className="flex gap-[4px] ">
                  <img
                    className="w-[20xp] h-[20px] "
                    src={location}
                    alt="location"
                  />
                  <p className="text-[16px] text-[#021526b3] ">
                    {listing?.city.name},{listing?.address}
                  </p>
                </div>
                <div className="flex gap-[5px] ">
                  <img
                    className="w-[18px] h-[18px]"
                    src={areaIcon}
                    alt="area"
                  />
                  <p className="text-[16px] text-[#021526b3] ">
                    ფართი {listing?.area}
                  </p>
                </div>
                <div className="flex gap-[5px] ">
                  <img className="w-[18px] h-[18px]" src={bed} alt="bed" />
                  <p className="text-[16px] text-[#021526b3] ">
                    საძინებელი {listing?.bedrooms}
                  </p>
                </div>
                <div className="flex gap-[5px] ">
                  <img className="w-[18px] h-[18px]" src={zip} alt="zip" />
                  <p className="text-[16px] text-[#021526b3] ">
                    საფოსტო ინდექსი {listing?.zip_code}
                  </p>
                </div>
              </div>
            </div>
            <p className="w-[503px] text-[16px] text-[#808a93] mt-[40px]">
              {listing?.description}
            </p>
            <div className="mt-[50px] border border-[#dbdbdb] rounded-[8px] px-[20px] py-[24px] ">
              <div className="flex items-center gap-[14px]">
                <img
                  className="w-[72px] h-[72px] rounded-[50%] "
                  src={listing?.agent.avatar}
                  alt="profile picture"
                />
                <div className="flex flex-col justify-center gap-[4px]">
                  <h3 className="text-[#021526] text-[16px] ">
                    {listing?.agent.name}
                  </h3>
                  <p className="text-[#676e76] text-[14px] ">აგენტი</p>
                </div>
              </div>
              <div className="flex flex-col gap-[4px] mt-[16px] ">
                <div className="flex items-center gap-[5px]">
                  <img className="w-[16px] h-[13px]" src={email} alt="" />
                  <p className=" text-[14px] text-[#808a93] ">
                    {listing?.agent.email}
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <img className="w-[13px] h-[13px]" src={phone} alt="" />
                  <p className=" text-[14px] text-[#808a93] ">
                    {listing?.agent.phone}
                  </p>
                </div>
              </div>
            </div>
            <button className=" w-[133px] border border-[#676e76] hover:bg-[#676e76] rounded-[8px] p-[10px] text-[12px] text-[#676e76] hover:text-[#fff] font-medium mt-[20px] " onClick={()=>{context?.setDeleteListing(true)}} > 
              ლისტინგის წაშლა
            </button>
          </div>
        </main>
        <h1 className="text-[32px] text-[#021526] font-medium mt-[67px]">
          ბინები მსგავს ლოკაციაზე
        </h1>
        {carouselArr?.length && carouselArr?.length > 4 ? (
          <div className="relative mt-[52px]">
            <button
              className="absolute top-[212.5px] left-[-65px] w-[30px] h-[30px]  "
              onClick={() => {
                sliderRef.current?.slickPrev();
              }}
            >
              <img src={goBack} alt="previous house" />
            </button>
            <button
              className="absolute top-[212.5px] right-[-65px] w-[30px] h-[30px]  "
              onClick={() => {
                sliderRef.current?.slickNext();
              }}
            >
              <img src={right} alt="next house" />
            </button>
            <Slider ref={sliderRef} {...settings}>
              {carouselArr?.map((item: RealEstate, i: number) => {
                return (
                  <div
                    key={i}
                    className="bg-[#fff] rounded-[14px] overflow-hidden w-[384px] flex flex-col "
                    onClick={() => {
                      navigate(`/${item.id}`);
                    }}
                  >
                    <div className="relative">
                      <img
                        className=" w-[384px] h-[307px] rounded-t-[14px]"
                        src={item.image}
                        alt=""
                      />
                      <div className="absolute left-[23px] top-[23px] bg-[#02152680] rounded-[15px] text-[12px] text-[#fff] px-[10px] py-[6px] font-medium ">
                        ქირავდება
                      </div>
                    </div>
                    <div className="w-[384px] border border-x-[#dbdbdb] border-b-[#dbdbdb] rounded-b-[14px] px-[25px] py-[22px] ">
                      <h1 className="text-[28px] text-[#021526] font-bold ">
                        {item.price}₾
                      </h1>
                      <div className="flex gap-[4px] mt-[6.5px]">
                        <img
                          className="w-[20xp] h-[20px] "
                          src={location}
                          alt="location"
                        />
                        <p className="text-[16px] text-[#021526b3] ">
                          {item.city.name},{item.address}
                        </p>
                      </div>
                      <div className="flex gap-[32px] mt-[20px] ">
                        <div className="flex gap-[5px] ">
                          <img
                            className="w-[18px] h-[18px]"
                            src={bed}
                            alt="bed"
                          />
                          <p className="text-[16px] text-[#021526b3] ">
                            {item.bedrooms}
                          </p>
                        </div>
                        <div className="flex gap-[5px] ">
                          <img
                            className="w-[18px] h-[18px]"
                            src={areaIcon}
                            alt="area"
                          />
                          <p className="text-[16px] text-[#021526b3] ">
                            {item.area}
                          </p>
                        </div>
                        <div className="flex gap-[5px] ">
                          <img
                            className="w-[18px] h-[18px]"
                            src={zip}
                            alt="zip"
                          />
                          <p className="text-[16px] text-[#021526b3] ">
                            {item.zip_code}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : (
          <div className="flex justify-start gap-[20px] w-[100%] mt-[52px] ">
            {carouselArr?.map((item: RealEstate, i: number) => {
              return (
                <div
                  key={i}
                  className="bg-[#fff] rounded-[14px] overflow-hidden w-[384px] flex flex-col "
                  onClick={() => {
                    navigate(`/${item.id}`);
                  }}
                >
                  <div className="relative">
                    <img
                      className=" w-[384px] h-[307px] rounded-t-[14px]"
                      src={item.image}
                      alt=""
                    />
                    <div className="absolute left-[23px] top-[23px] bg-[#02152680] rounded-[15px] text-[12px] text-[#fff] px-[10px] py-[6px] font-medium ">
                      ქირავდება
                    </div>
                  </div>
                  <div className="w-[384px] border border-x-[#dbdbdb] border-b-[#dbdbdb] rounded-b-[14px] px-[25px] py-[22px] ">
                    <h1 className="text-[28px] text-[#021526] font-bold ">
                      {item.price}₾
                    </h1>
                    <div className="flex gap-[4px] mt-[6.5px]">
                      <img
                        className="w-[20xp] h-[20px] "
                        src={location}
                        alt="location"
                      />
                      <p className="text-[16px] text-[#021526b3] ">
                        {item.city.name},{item.address}
                      </p>
                    </div>
                    <div className="flex gap-[32px] mt-[20px] ">
                      <div className="flex gap-[5px] ">
                        <img
                          className="w-[18px] h-[18px]"
                          src={bed}
                          alt="bed"
                        />
                        <p className="text-[16px] text-[#021526b3] ">
                          {item.bedrooms}
                        </p>
                      </div>
                      <div className="flex gap-[5px] ">
                        <img
                          className="w-[18px] h-[18px]"
                          src={areaIcon}
                          alt="area"
                        />
                        <p className="text-[16px] text-[#021526b3] ">
                          {item.area}
                        </p>
                      </div>
                      <div className="flex gap-[5px] ">
                        <img
                          className="w-[18px] h-[18px]"
                          src={zip}
                          alt="zip"
                        />
                        <p className="text-[16px] text-[#021526b3] ">
                          {item.zip_code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </>
  );
}

export default Listing;
