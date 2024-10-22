import React, { useState, useEffect } from "react";
import { Input, DatePicker, Select, Slider, Checkbox, Collapse } from "antd";
import { CarOutlined, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import HotelCard from "./HotelList";

function HotelPage() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [priceRange, setPriceRange] = useState([100, 2000]);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (!date || !checkOutDate) {
      setNights(0);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    if (!date || !checkInDate) {
      setNights(0);
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nightsCount = dayjs(checkOutDate).diff(dayjs(checkInDate), "day");
      setNights(nightsCount);
    }
  }, [checkInDate, checkOutDate]);

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

  const sortData = [
    {
      value: "Recommended",
      label: (
        <span className="text-black font-semibold text-[18px]">
          Sort by Recommended
        </span>
      ),
    },
    {
      value: "Price",
      label: (
        <span className="text-black font-semibold text-[18px]">
          Sort by Price
        </span>
      ),
    },
    {
      value: "Rating",
      label: (
        <span className="text-black font-semibold text-[18px]">
          Sort by Rating
        </span>
      ),
    },
  ];

  return (
    <div className="px-[150px] pb-[27px] mt-[160px]">
      {/*Search bar */}
      <div className="border-2 py-[32px] px-[54px] h-[120px] rounded-md">
        <div className="flex flex-row space-x-[16px] ">
          <Input
            className="w-[480px] h-[56px] border-[#A1A1A1] focus:ring-2 focus:ring-indigo-500 shadow-sm rounded-md px-4 py-2"
            placeholder="Enter City or Location"
            prefix={<CarOutlined />}
            size="large"
          />

          <DatePicker
            className="w-[280px] h-[56px] border-[#A1A1A1]"
            onChange={handleCheckInChange}
            size="large"
            placeholder="Check-in"
            format="ddd DD/MM"
          />

          <DatePicker
            className="w-[280px] h-[56px] border-[#A1A1A1]"
            onChange={handleCheckOutChange}
            size="large"
            placeholder="Check-out"
            format="ddd DD/MM"
          />

          <div className="flex items-center justify-center">
            <div className="border-2 border-[#A1A1A1] rounded-xl w-[110.73px] h-[39.89px] flex items-center justify-center">
              <p className="font-bold text-base text-black py-[7.95px] px-[19.86px]">
                {nights} Night{nights !== 1 ? "" : ""}
              </p>
            </div>
          </div>

          <Select
            className="w-[280px] h-[56px] border-[1px] rounded-md border-[#A1A1A1]"
            placeholder="Select Room"
            options={data}
            allowClear
          />
        </div>
      </div>

      <div className="mt-[28px]">
        <div className=" grid grid-cols-4 gap-6">
          {/* Filters Section */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-4">Filters</h3>
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIconPosition="right"
                className="bg-white"
              >
                {/* Price Filter */}
                <Collapse.Panel
                  key="1"
                  header={<h4 className="font-semibold text-[18px] mb-2">Price</h4>}
                >
                  <div className="mb-6">
                    <Slider
                      range
                      min={100}
                      max={2000}
                      defaultValue={priceRange}
                      onChange={setPriceRange}
                      className="mb-4"
                    />
                    <p className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </p>
                  </div>
                </Collapse.Panel>

                {/* Rating Filter */}
                <Collapse.Panel
                  key="2"
                  header={<h4 className="font-semibold text-[18px] mb-2">Rating</h4>}
                >
                  <div className="mb-6">
                    <div className="space-x-4 flex flex-row">
                      <button className="p-2 border border-[#a9b489] rounded-md hover:bg-[#a9b489] hover:text-white transition w-[45px] h-[40px]">
                        0+
                      </button>
                      <button className="p-2 border border-[#a9b489] rounded-md hover:bg-[#a9b489] hover:text-white transition w-[45px] h-[40px]">
                        1+
                      </button>
                      <button className="p-2 border border-[#a9b489] rounded-md hover:bg-[#a9b489] hover:text-white transition w-[45px] h-[40px]">
                        2+
                      </button>
                      <button className="p-2 border border-[#a9b489] rounded-md hover:bg-[#a9b489] hover:text-white transition w-[45px] h-[40px]">
                        3+
                      </button>
                      <button className="p-2 border border-[#a9b489] rounded-md hover:bg-[#a9b489] hover:text-white transition w-[45px] h-[40px]">
                        4+
                      </button>
                    </div>
                  </div>
                </Collapse.Panel>

                {/* Freebies Filter */}
                <Collapse.Panel
                  key="3"
                  header={<h4 className="font-semibold text-[18px] mb-2">Freebies</h4>}
                >
                  <div className="mb-6">
                    <div className="space-y-2 flex flex-col">
                      <Checkbox>Free breakfast</Checkbox>
                      <Checkbox>Free parking</Checkbox>
                      <Checkbox>Free internet</Checkbox>
                      <Checkbox>Free airport shuttle</Checkbox>
                      <Checkbox>Free cancellation</Checkbox>
                    </div>
                  </div>
                </Collapse.Panel>

                {/* Amenities Filter */}
                <Collapse.Panel
                  key="4"
                  header={<h4 className="font-semibold text-[18px] mb-2">Amenities</h4>}
                >
                  <div className="mb-6">
                    <div className="space-y-2 flex flex-col">
                      <Checkbox>24hr front desk</Checkbox>
                      <Checkbox>Air-conditioned</Checkbox>
                      <Checkbox>Fitness</Checkbox>
                      <Checkbox>Pool</Checkbox>
                    </div>
                  </div>
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>

          {/* Hotels List Section */}
          <div className="col-span-3">
            <div className="flex flex-row justify-between mb-4 text-base">
              <span>
                <span className="font-semibold text-black text-[18px]">
                  Showing 4 of{" "}
                </span>
                <span className="text-[#FF8682] text-[18px]"> 257 places </span>
              </span>
              <div>
                <Select
                  className="mr-4 border-none w-[213px]"
                  placeholder={
                    <span className="text-black font-semibold text-[18px]">
                      Sort By ...
                    </span>
                  }
                  allowClear
                  options={sortData}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <HotelCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelPage;
