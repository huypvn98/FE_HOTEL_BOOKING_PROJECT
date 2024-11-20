import React, { useState, useEffect } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  CarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import hotlady from "../../../assets/stock-photo-traveler-tourist-woman-in-casual-clothes-hat-camera-point-thumb-finger-back-aside-on-workspace-area-2063722232-removebg-preview 1.png";
import image from "../../../image/backgroundImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../../redux/slices/hotelSlice";
import { MagnifyingGlass } from "react-loader-spinner";

function Home() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [room, setRoom] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector((state) => state.hotelSlice);
  const baseURL =
    "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net";

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (date) {
      localStorage.setItem("checkInDate", date.format("YYYY-MM-DD"));
    } else {
      localStorage.removeItem("checkInDate");
    }
    if (!date || !checkOutDate) {
      setNights(0);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    if (date) {
      localStorage.setItem("checkOutDate", date.format("YYYY-MM-DD"));
    } else {
      localStorage.removeItem("checkOutDate");
    }
    if (!date || !checkInDate) {
      setNights(0);
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nightsCount = dayjs(checkOutDate).diff(dayjs(checkInDate), "day");
      setNights(nightsCount);
      localStorage.setItem("nights", nightsCount);
    }
  }, [checkInDate, checkOutDate]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      location,
      checkInDate: checkInDate ? checkInDate.format("YYYY-MM-DD") : "",
      checkOutDate: checkOutDate ? checkOutDate.format("YYYY-MM-DD") : "",
      nights,
      roomValue: room ? room.value : "",
      roomLabel: room ? room.label : "",
    }).toString();
    navigate(`/hotel?${queryParams}`);
  };

  const data = [
    {
      value: 1,
      label: "1 room, 2 guests",
    },
    {
      value: 2,
      label: "2 rooms, 4 guests",
    },
    {
      value: 3,
      label: "1 room, 1 guest",
    },
  ];

  function ImageCard({ src, alt, className }) {
    return <img loading="lazy" src={src} alt={alt} className={className} />;
  }

  const images = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce0c97e87b45b29de0bf68a68edf7354395bfdfcac5df566ff94b65dab3c004b?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325",
      alt: "Background image",
      className: "object-cover absolute inset-0 size-full",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e01562a1f7882f600515f886b301714e0ae34dc2bdf82d8b099ea3313eb40e1f?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325",
      alt: "Foreground image",
      className: "object-contain z-10 mt-0 w-full aspect-[0.68]",
    },
  ];

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <div>
      <img
        loading="lazy"
        src={image}
        alt="background"
        className="w-full h-[800px]"
      />
      <div className="mb-[160px]">
        <div className="mx-[250px]">
          {/* search bar */}
          <div className="border-2 mr-[6px] w-[1410px] py-[32px] px-[54px] h-[200px] rounded-t-lg shadow-md absolute bottom-4 bg-white">
            <div className="flex flex-row space-x-[16px] ">
              <Input
                className="w-[480px] h-[56px] border-[#A1A1A1] focus:ring-2 focus:ring-indigo-500 shadow-sm rounded-md px-4 py-2"
                placeholder="Enter City or Location"
                prefix={<CarOutlined />}
                size="large"
                onChange={(e) => setLocation(e.target.value)}
              />

              <DatePicker
                className="w-[280px] h-[56px] border-[#A1A1A1]"
                onChange={handleCheckInChange}
                disabledDate={disabledDate}
                size="large"
                placeholder="Check-in"
                format="ddd DD/MM"
              />

              <DatePicker
                className="w-[280px] h-[56px] border-[#A1A1A1]"
                onChange={handleCheckOutChange}
                disabledDate={disabledDate}
                size="large"
                placeholder="Check-out"
                format="ddd DD/MM"
              />

              <div className="flex items-center justify-center">
                <div className="border-2 border-[#A1A1A1] rounded-xl w-[110.73px] h-[39.89px] flex items-center justify-center">
                  <p className="font-bold text-base text-black py-[7.95px] px-[19.86px]">
                    {nights} Night{nights !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <Select
                className="w-[280px] h-[56px] border-[1px] rounded-md border-[#A1A1A1]"
                placeholder="Select Room"
                options={data}
                allowClear
                onChange={(value) =>
                  setRoom(data.find((option) => option.value === value))
                }
              />
            </div>
            <div className="mt-[32px]">
              <button
                className="w-full h-[48px] bg-[#a9b489] text-white px-4 py-2 rounded-md hover:bg-[#afb896] text-[18px] font-semibold"
                onClick={handleSearch}
              >
                {" "}
                <SearchOutlined /> Search
              </button>
            </div>
          </div>

          {/* hotel card*/}
          <div className="mt-[180px]">
            <div className="flex flex-row justify-between">
              <p className="font-sans font-extrabold text-2xl leading-[43.58px] items-center">
                Explore Our Popular Hotel{" "}
              </p>
              <div className="flex flex-row space-x-6 items-center">
                <Button
                  shape="round"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#EFEFEF",
                    borderColor: "#EFEFEF",
                  }}
                >
                  <LeftOutlined />
                </Button>
                <Button
                  shape="round"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#A9B489",
                    borderColor: "#A9B489",
                  }}
                  icon={<RightOutlined style={{ color: "white" }} />}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pt-[60px]">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#a9b489"
                  />
                </div>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                Array.isArray(hotels) &&
                hotels.map((hotel) => (
                  <Link to={`/hotel/detail/${hotel.hotelID}`}>
                    <div key={hotel.hotelID} className="space-y-4">
                      <div>
                        <img
                          alt="hotel"
                          src={`${baseURL}${hotel.urlImage}`}
                          className="rounded-[24px]"
                          style={{ height: "404px", width: "330px" }}
                        />
                      </div>
                      <div className="flex flex-col space-y-3">
                        <div>
                          <p className="font-sans font-bold leading-[32.68px] text-[24px]">
                            {hotel.hotelName}
                          </p>
                          <p>HCM city</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center">
                          <p className="text-[#A9B489] font-bold text-[24px] leading-[32.68px]">
                            $40
                          </p>
                          <p className="text-[18px] leading-[24.51px] font-semibold">
                            per night
                          </p>
                        </div>
                        <div>
                          <p className="font-normal font-sans text-[18px] leading-[26px] line-clamp-2">
                            {hotel.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mx-[305px]">
          <div className="flex flex-col pt-12 max-w-[450px] mt-[120px]">
            <div className="flex relative flex-col px-7 pb-12 w-full min-h-[600px]">
              {images.map((image, index) => (
                <ImageCard key={index} {...image} />
              ))}
            </div>
          </div>
          <div className="w-[700px] justify-center mt-[250px]">
            <header className="flex flex-col w-full text-zinc-800 max-md:max-w-full">
              <h2 className="text-base font-semibold opacity-60">
                WELCOME TO OUR SITE!
              </h2>
              <h1 className="mt-1.5 w-full text-3xl font-extrabold max-md:max-w-full">
                We are the best company for your visit
              </h1>
            </header>
            <p className="mt-8 w-full text-lg leading-8 text-zinc-800 max-md:max-w-full">
              After decades of experience, and a whole life in Lucca, we offer
              you the most complete tourism service in the city. In addition to
              having bikes and rickshaws to have as much fun as you want, you
              have the choice of tour guides with whom to tour and drivers for
              your every need! We offer packages in the way that you get the
              most at the lowest price. Book with us and we will always be
              available for you!
            </p>
          </div>
        </div>

        {/* Special offer */}
        <div className="relative h-[450px] bg-gradient-to-r from-[#D6E0AB] to-[#A9B489] mt-[217px]">
          <div className="absolute top-[-150px] right-[250px] h-[600px] w-auto">
            <img className="h-full w-auto" src={hotlady} />
          </div>
          <div className="mx-[250px] my-[60px] flex flex-row justify-between items-center h-full">
            <div className="bg-[#FFFFFF4D] rounded-[24px] w-[569px] h-[330px] py-[60px] p-[30px]">
              <div className="flex flex-col items-center justify-center space-y-8">
                <h1 className="font-sans font-extrabold text-[32px] leading-[43.58px] text-center">
                  Get in Touch with Us
                </h1>
                <p className="font-sans font-normal text-[18px] leading-[26px] text-center">
                  We'd love to hear from you! Please fill out the form below,
                  and we'll get back to you as soon as possible.
                </p>
                <Link to="/contact">
                  <Button
                    className="rounded-[50px] w-[212px] h-[47px] text-white"
                    style={{ backgroundColor: "#A9B489" }}
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Most picket */}
        <div className="mx-[250px] grid grid-cols-4 gap-[29px] mt-[120px]">
          {Array.isArray(hotels) &&
            hotels.map((hotel) => (
              <Link to={`/hotel/detail/${hotel.hotelID}`}>
                <div key={hotel.hotelID} className="flex flex-col">
                  <img
                    className="w-[263px] h-[180px] rounded-[15px]"
                    src={`${baseURL}${hotel.urlImage}`}
                  />
                  <div className="mt-[20px]">
                    <p className="font-sans">{hotel.hotelName}</p>
                    <p className="font-sans text-[#B0B0B0]">HCM city</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* customer comment */}
        <div className="mx-[250px] mt-[120px]">
          <div className="flex flex-row justify-between">
            <p className="font-sans font-extrabold text-2xl leading-[43.58px] items-center">
              Happy Customers Says
            </p>
            <div className="flex flex-row space-x-6 items-center">
              <Button
                shape="round"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#EFEFEF",
                  borderColor: "#EFEFEF",
                }}
              >
                <LeftOutlined />
              </Button>
              <Button
                shape="round"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#A9B489",
                  borderColor: "#A9B489",
                }}
                icon={<RightOutlined style={{ color: "white" }} />}
              />
            </div>
          </div>
          <div className="mt-[60px] flex flex-row justify-between space-x-5">
            <div className="flex flex-col items-center p-8 text-lg bg-white rounded-3xl border border-solid border-zinc-100 max-w-[700px] text-zinc-800 max-md:px-5">
              <div className="flex flex-col items-center text-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b06437acd2e45220176cc291190095560c5497b4fdb0f4e4dd86b11bfbba86ef?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                  alt="Lyod Gomez's profile picture"
                  className="object-contain w-20 rounded-full aspect-square"
                />
                <div className="mt-4">Lyod Gomez</div>
              </div>
              <div className="flex flex-col w-full leading-8">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ff38c6cffce93483a99a973d89a8366415b2cfb8f6b4e540a3afc7a5288b5b3?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                  alt=""
                  className="object-contain w-10 aspect-[1.43]"
                />
                <div className="self-center mt-2.5 max-md:max-w-full">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ff38c6cffce93483a99a973d89a8366415b2cfb8f6b4e540a3afc7a5288b5b3?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                  alt=""
                  className="object-contain self-end mt-6 w-10 aspect-[1.43]"
                />
              </div>
            </div>
            <div className="flex flex-col items-center p-8 text-lg bg-white rounded-3xl border border-solid border-zinc-100 max-w-[700px] text-zinc-800 max-md:px-5">
              <div className="flex flex-col items-center text-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b06437acd2e45220176cc291190095560c5497b4fdb0f4e4dd86b11bfbba86ef?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                  alt="Lyod Gomez's profile picture"
                  className="object-contain w-20 rounded-full aspect-square"
                />
                <div className="mt-4">Lyod Gomez</div>
              </div>
              <div className="flex flex-col w-full leading-8">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ff38c6cffce93483a99a973d89a8366415b2cfb8f6b4e540a3afc7a5288b5b3?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                  alt=""
                  className="object-contain w-10 aspect-[1.43]"
                />
                <div className="self-center mt-2.5 max-md:max-w-full">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ff38c6cffce93483a99a973d89a8366415b2cfb8f6b4e540a3afc7a5288b5b3?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                  alt=""
                  className="object-contain self-end mt-6 w-10 aspect-[1.43]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
