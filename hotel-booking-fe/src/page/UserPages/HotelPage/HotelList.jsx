import React from "react";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import { Divider, } from "antd";
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  const baseURL = "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net";
  return (
    <div className="bg-white rounded-lg shadow-md flex space-x-6">
      {/* Hotel Image */}
      <div className="relative">
        <img
          className="rounded-l-xl h-[334.82px] object-cover w-[480.29px]"
          src={`${baseURL}${hotel.urlImage}`}
          alt={hotel.hotelName}
        />
        <div className="absolute top-2 right-2 bg-slate-200 bg-opacity-50 rounded-lg h-[36.72px] w-[82.36px] flex items-center justify-center">
          <p className="text-black px-2 py-1 text-sm">9 images</p>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="flex-1 w-[500px] p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {hotel.hotelName}
        </h2>
        <p className="text-base text-gray-500 mt-1">
          <EnvironmentOutlined /> City Center, 15 & 15A, Connaught Rd, Modi Colony, Pune,
          Maharashtra 411001
        </p>

        {/* Hotel Rating and Amenities */}
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-[#a9b489] text-lg">★★★★★</span>
          <span className="text-base text-gray-600">5 Star Hotel</span>
          <span className="text-base text-gray-600">• 20+ Amenities</span>
        </div>

        {/* Reviews and Rating and Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center mt-2">
            <div className="bg-white border-2 border-[#a9b489] text-black font-bold text-base rounded-md px-2 py-1">
              4.2
            </div>
            <span className="ml-2 text-base text-black">
              <span className="font-bold">Very Good</span> 371reviews
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#a9b489]">$100/night</span>
            <span className="text-gray-500 text-base flex justify-end ">
              {" "}
              excl. tax
            </span>
          </div>
        </div>

        <Divider className="my-[27px]" style={{ height: "4px" }} />

        {/* Favorite and Action Button */}
        <div>
          <div className="flex items-center space-x-8">
            <button className="p-2 border border-[#a9b489] rounded-md hover:bg-red-400 hover:text-white hover:border-red-400 transition w-[55px] h-[55px]">
              <HeartOutlined className="text-lg p-2" />
            </button>
            <Link to={`/hotel/detail/${hotel.hotelID}`}>
              <button className="bg-[#a9b489] text-white text-[15px] px-4 py-2 rounded-md hover:bg-[#afb896] transition w-[550px] h-[55px]">
                View Place
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
