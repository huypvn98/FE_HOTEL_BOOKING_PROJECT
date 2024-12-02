import React, { useEffect, useState } from "react";
import pointer from "../../../assets/pointer.png";
import { Badge, Button } from "antd";
import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import "./HotelDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  fetchHotelDetail,
  fetchHotels,
} from "../../../redux/slices/hotelSlice";
import {
  bed,
  bedDetail,
  hotelDetail,
  roomDetail,
  roomsByHotel,
} from "../../../redux/selector";
import { images } from "./imagesData";
import {
  fetchAllRoom,
  fetchRoomByHotel,
} from "../../../redux/slices/roomSlice";
import { fetchAllRoomDetail } from "../../../redux/slices/roomDetailSlice";
import { fetchAllBedDetail } from "../../../redux/slices/bedSlice";
import reviews from "../../../utils/reviewData.json";

const HotelDetail = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const baseURL =
    "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net";

  const rooms = [
    {
      id: 1,
      type: "Superior room - City view",
      bed: "1 double bed or 2 twin beds",
      price: "$240/night",
    },
    {
      id: 2,
      type: "Superior room - City view",
      bed: "1 double bed or 2 twin beds",
      price: "$240/night",
    },
    {
      id: 3,
      type: "Superior room - City view",
      bed: "1 double bed or 2 twin beds",
      price: "$240/night",
    },
    {
      id: 4,
      type: "Superior room - City view",
      bed: "1 double bed or 2 twin beds",
      price: "$240/night",
    },
  ];

  const amenities = [
    { icon: "🏊", name: "Swimming pool" },
    { icon: "🅿️", name: "Parking area" },
    { icon: "📶", name: "Free WiFi" },
    { icon: "🔒", name: "24/7 Security" },
  ];

  const amenities1 = [
    { text: "Near park" },
    { text: "Near nightlife" },
    { text: "Near theater" },
    { text: "Clean Hotel" },
  ];

  const detailedAmenities = [
    [
      { icon: "🏊", name: "Outdoor pool" },
      { icon: "🏊", name: "Indoor pool" },
      { icon: "💆", name: "Spa and wellness center" },
      { icon: "🍽️", name: "Restaurant" },
      { icon: "🛎️", name: "Room service" },
    ],
    [
      { icon: "💪", name: "Fitness center" },
      { icon: "🍷", name: "Bar/Lounge" },
      { icon: "📶", name: "Free Wi-Fi" },
      { icon: "☕", name: "Tea/coffee machine" },
    ],
  ];

  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      style={{ color: "#ffeb36" }}
    >
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
    </svg>
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const hotel = useSelector(hotelDetail);
  const roomsById = useSelector(roomsByHotel);
  const roomDetails = useSelector(roomDetail);
  const bedDetails = useSelector(bedDetail);
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setCurrentImage(""), 300); // Delay clearing image for smooth close animation
  };

  console.log("hotel", hotel);

  const averagePricePerNight =
    hotel?.rooms && hotel?.rooms.length > 0
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }).format(
          (hotel.rooms.reduce(
            (sum, room) => sum + (room?.roomDetail?.pricePerNight || 0),
            0
          ) /
            hotel.rooms.length) *
            100
        )
      : "0 VND";
  useEffect(() => {
    dispatch(fetchAllRoom());
    dispatch(fetchHotelDetail(id));
    dispatch(fetchRoomByHotel(id));
    dispatch(fetchAllRoomDetail());
    dispatch(fetchAllBedDetail());
  }, [dispatch, id]);

  useEffect(() => {
    // Simulating data fetch
    if (hotel?.rooms) {
      const timer = setTimeout(() => {
        setLoading(false); // Stop loading once data is fetched
      }, 5000); // Replace with actual fetch timing
      return () => clearTimeout(timer);
    }
  }, [hotel?.rooms]);

  console.log("Hotel ID:", id);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  // Add a check to handle the case when hotel data is not yet loaded
  //if (!hotel) return <div>No hotel data available</div>;
  console.log("room by hotelId: ", roomsById);

  console.log("roomDetail: ", roomDetails);

  console.log("bedDetail: ", bedDetails);
  console.log("hotel", hotel);
  return (
    <div style={{ marginTop: "100px" }} className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <h1 style={{ marginBottom: "20px" }} className="text-1xl font-bold">
        HCM City {">"} {hotel?.hotelName}
      </h1>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{hotel?.hotelName}</h1>
        <div style={{ display: "flex", marginRight: "250px" }}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon /> <div style={{ marginLeft: "5px" }}>5 Star Hotel</div>
        </div>
        <div
          style={{ flexDirection: "column" }}
          className="flex items-center gap-2"
        >
          <div className="text-2xl font-bold">
            {" "}
            {averagePricePerNight}/night
          </div>
          {/* Icon Buttons */}
          <div className="flex items-center gap-2">
            <Button
              shape="default"
              icon={<HeartOutlined />}
              className="icon-button"
            />
            <Button
              shape="default"
              icon={<ShareAltOutlined />}
              className="icon-button"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "-20px 0 0 0 ",
        }}
      >
        <img src={pointer} style={{ height: "15px", margin: "2px 2px 0 0" }} />
        {hotel?.address}
      </div>
      <div
        style={{
          margin: "15px 0 20px 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Badge
          count="4.2"
          style={{
            backgroundColor: "#fff",
            color: "black",
            fontSize: "20px",
            border: "1px solid #a9b489",
            padding: "10px 20px 30px 20px",
            borderRadius: "4px",
            margin: "0 2px 0 0",
          }}
        />
        <div style={{ margin: "0 0 0 8px", fontSize: 16, fontWeight: "500" }}>
          Very Good
        </div>
        <text style={{ margin: "0 0 0 4px", fontSize: 16 }}>371 reviews</text>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="col-span-2 row-span-2 relative">
          {/* Show spinner while loading */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 rounded">
              <div className="spinner"></div>
            </div>
          )}

          {/* Main Image */}
          <img
            style={{ height: "392px" }}
            src={`${baseURL}${hotel?.urlImage}`}
            alt="Main property view"
            className={`w-full h-full object-cover rounded ${
              loading ? "hidden" : "block"
            }`}
            onLoad={() => setLoading(false)} // Hide spinner after image loads
            onClick={() => openModal(`${baseURL}${hotel?.urlImage}`)} // Open modal on click
          />
        </div>
        {hotel?.rooms?.map((room, idx) => (
          <div key={idx} className="h-48">
            <img
              src={room?.imageRooms[0]?.nameFileImg}
              className="w-full h-full object-cover rounded"
              onClick={() => openModal(room?.imageRooms[0]?.nameFileImg)} // Open modal with the clicked room image
            />
          </div>
        ))}
      </div>
      <Button
        style={{ background: "#8DD3BB", border: "none", color: "black" }}
        className="view-all-button"
      >
        View all photos
      </Button>

      {/* Modal for Enlarged Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 fade-in-bg"
          onClick={closeModal} // Close modal when clicking outside the image
        >
          <div className="relative">
            {/* Close Button */}
            <button className="close-button" onClick={closeModal}>
              ✕
            </button>
            {/* Enlarged Image */}
            <img
              src={currentImage}
              alt="Enlarged view"
              className="max-w-full max-h-screen rounded fade-in-image"
              style={{ width: "1400px", height: "700px", borderRadius: "10px" }}
            />
          </div>
        </div>
      )}

      {/* Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">{hotel?.description}</p>
        <div className="flex gap-6">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xl">{amenity.icon}</span>
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ marginBottom: "20px" }}
        className="flex flex-wrap items-center gap-4"
      >
        {/* Rating Box */}
        <div className="bg-[#a9b489] rounded-lg p-4 text-white text-center min-w-[120px]">
          <div className="text-3xl font-bold">4.2</div>
          <div className="text-sm">Very good</div>
          <div className="text-xs">371 reviews</div>
        </div>

        {/* Amenity Cards */}
        {amenities1.map((amenity, index) => (
          <div
            key={index}
            style={{ height: "105px" }}
            className="w-32 p-4 border border-gray-200 rounded-lg text-center shadow-sm min-w-[120px]"
          >
            <div className="flex flex-col items-center gap-1">
              <StarIcon />
              <span
                style={{ marginTop: "20px" }}
                className="text-sm text-gray-700"
              >
                {amenity.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <h2>Rooms</h2>
      {roomsById && roomsById.length > 0 ? (
        roomsById.map((room) => (
          <div key={room.id}>
            <h3>Room: {room.roomNumber}</h3>
            <p>Square Feet: {room.roomSquare}</p>
            <p>Quantity: {room.quantity}</p>
            <p>bed Id: {room.idBed}</p>
          </div>
        ))
      ) : (
        <p>No rooms available for this hotel.</p>
      )}

      <div>
        <h2>Rooms</h2>
        {roomDetails && roomDetails.length > 0 ? (
          roomDetails.map((room) => (
            <div key={room.id}>
              <h3>Room Type: {room.roomType}</h3>
              <p>Room View: {room.roomView}</p>
              <p>Room Fittings: {room.roomFittings}</p>
            </div>
          ))
        ) : (
          <p>No rooms available for this hotel.</p>
        )}
      </div>

      <div>
        <h2>Rooms</h2>
        {bedDetails && bedDetails.length > 0 ? (
          bedDetails.map((room) => (
            <div key={room.id}>
              <h3>{room.bedID}</h3>
            </div>
          ))
        ) : (
          <p>No rooms available for this hotel.</p>
        )}
      </div> */}

      {/* <h2>Test</h2> */}
      {hotel?.rooms?.map((room, index) => (
        <div key={index}>
          <img
            src={room?.imageRooms[0]?.nameFileImg}
            className="w-full h-full object-cover rounded"
            style={{ marginBottom: "10px" }}
          />
        </div>
      ))}

      {/* Available Rooms */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold p-6 border-b">Available Rooms</h2>
        <div className="divide-y">
          {loading ? (
            // Spinner Animation
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : hotel?.rooms && hotel.rooms.length > 0 ? (
            hotel.rooms.map((room) => {
              const formattedPrice = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
              }).format(room.roomDetail?.pricePerNight * 100);

              return (
                <div
                  key={room.id}
                  className="flex justify-between items-center p-6"
                >
                  {/* Room Details */}
                  <div>
                    <h3 style={{ fontWeight: "bold" }}>
                      {room.roomDetail?.roomType} - {room.roomDetail?.roomView}
                    </h3>
                    <p>{room.roomDetail?.roomFittings}</p>
                    <p>Room number: {room.roomNumber}</p>
                  </div>

                  {/* Bed Type */}
                  <p>
                    {room.bedRooms[0]?.bed?.bedID === 1
                      ? "Single Bed"
                      : room.bedRooms[0]?.bed?.bedID === 2
                      ? "Double Bed"
                      : "Not found"}
                  </p>
                  {/* <p>{room.bedRooms[0]?.quantity}</p> */}

                  {/* Price and Book Button */}
                  <div className="flex items-center gap-4">
                    <h3 style={{ fontWeight: "bold" }}>
                      {formattedPrice}/night
                    </h3>
                    <Button
                      style={{
                        background: "#a9b489",
                        border: "none",
                        color: "white",
                      }}
                      onClick={() => navigate(`/bookingcart/${room.roomID}`)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No rooms are currently available for this hotel!</p>
          )}
        </div>
      </div>

      {/* Location Map */}
      {/* <div className="bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold p-6 border-b">
          Location/Map
          <div className="flex justify-end">
            <Button
              style={{
                background: "#a9b489",
                border: "none",
                color: "white",
                marginTop: "-20px",
              }}
            >
              View On Google Map
            </Button>
          </div>
        </h2>
        <div className="p-6">
          <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
            Map placeholder
          </div>
        </div>
      </div> */}

      {/* Detailed Amenities Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 flex justify-between items-center border-b">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-4xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <div className="font-semibold text-lg">Very good</div>
                <div className="text-gray-500 text-sm">
                  {totalReviews} verified reviews
                </div>
              </div>
            </div>
          </div>
          <Button
            style={{ background: "#a9b489", border: "none", color: "white" }}
          >
            Give your review
          </Button>
        </div>

        <div className="divide-y">
          {currentReviews.map((review, idx) => (
            <div key={idx} className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={review.avatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{review.userName}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-yellow-500">{review.rating} ★</span>
                    </div>
                    <button className="text-gray-500">🏴</button>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t flex items-center justify-center gap-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ←
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
