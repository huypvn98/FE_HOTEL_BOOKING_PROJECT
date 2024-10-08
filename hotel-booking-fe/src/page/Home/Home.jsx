import React from "react";
import { Button, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import hotel from "../../../assets/caption.jpg";
import hotlady from "../../../assets/stock-photo-traveler-tourist-woman-in-casual-clothes-hat-camera-point-thumb-finger-back-aside-on-workspace-area-2063722232-removebg-preview 1.png";
// import profile from "../../assets/Ellipse 4.png";

function Home() {
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
  return (
    <div className="mt-[123px] mb-[160px]">
      <div className="mx-[250px]">
        {/* hotel card*/}
        <div>
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
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <img
                    alt="hotel"
                    src={hotel}
                    className="rounded-[24px]"
                    style={{ height: "404px", width: "330px" }}
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <div>
                    <p className="font-sans font-bold leading-[32.68px] text-[24px]">
                      GRAND SAIGON
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
                    <p className="font-normal font-sans text-[18px] leading-[26px]">
                      Visit the beautiful Siena and the cities that surround it
                      to experience ...
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            After decades of experience, and a whole life in Lucca, we offer you
            the most complete tourism service in the city. In addition to having
            bikes and rickshaws to have as much fun as you want, you have the
            choice of tour guides with whom to tour and drivers for your every
            need! We offer packages in the way that you get the most at the
            lowest price. Book with us and we will always be available for you!
          </p>
        </div>
      </div>

      {/* Special offer */}
      <div className="relative h-[450px] bg-gradient-to-r from-[#D6E0AB] to-[#A9B489] mt-[217px]">
        <div className="absolute top-[-150px] right-[250px] h-[600px] w-auto">
          <img className="h-full w-auto" src={hotlady} />
        </div>
        <div className="mx-[250px] my-[60px] flex flex-row justify-between items-center h-full">
          <div className="bg-[#FFFFFF4D] rounded-[24px] w-[569px] h-[330px] my-[60px] p-[30px]">
            <div className="flex flex-col items-center justify-center space-y-8">
              <h1 className="font-sans font-extrabold text-[32px] leading-[43.58px] text-center">
                Get Special Offers for Organizations
              </h1>
              <p className="font-sans font-normal text-[18px] leading-[26px] text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
              <Button
                className="rounded-[50px] w-[212px] h-[47px] text-white"
                style={{ backgroundColor: "#A9B489" }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Most picket */}
      <div className="mx-[250px] grid grid-cols-4 gap-[29px] mt-[120px]">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex flex-col">
            <img className="w-[263px] h-[180px] rounded-[15px]" src={hotel} />
            <div className="mt-[20px]">
              <p className="font-sans">GRAND SAIGON</p>
              <p className="font-sans text-[#B0B0B0]">HCM city</p>
            </div>
          </div>
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
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure
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
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure
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
  );
}

export default Home;