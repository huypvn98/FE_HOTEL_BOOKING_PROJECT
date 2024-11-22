import React, { useState } from "react";
import { Button } from "antd";
import reviewData from "../../../utils/reviewData.json";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
function CustomerComment() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;
  
  // Filter reviews with rating 4 and 5
  const filteredReviews = reviewData.filter(
    (review) => review.rating === 4 || review.rating === 5
  );

  // Get current reviews for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredReviews.length / reviewsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
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
            onClick={handlePrevPage}
            disabled={currentPage === 1}
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
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)
            }
            icon={<RightOutlined style={{ color: "white" }} />}
          />
        </div>
      </div>
      <div className="mt-[60px] flex flex-row justify-between space-x-5">
        {currentReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-center p-8 text-lg bg-white rounded-3xl border-2 border-solid border-zinc-100 w-[700px] text-zinc-800 max-md:px-5"
          >
            <div className="flex flex-col items-center text-center">
              <img
                loading="lazy"
                src={review.avatar}
                alt={`${review.userName}'s profile picture`}
                className="object-cover w-20 rounded-full aspect-square"
              />
              <div className="mt-4">{review.userName}</div>
            </div>
            <div className="flex flex-col w-full leading-8">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ff38c6cffce93483a99a973d89a8366415b2cfb8f6b4e540a3afc7a5288b5b3?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                alt=""
                className="object-contain w-10 aspect-[1.43]"
              />
              <div className="self-center mt-2.5 max-md:max-w-full">
                {review.comment}
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ff38c6cffce93483a99a973d89a8366415b2cfb8f6b4e540a3afc7a5288b5b3?placeholderIfAbsent=true&apiKey=0ee0a0b32dce4afba66955d45de6e325"
                alt=""
                className="object-contain self-end mt-6 w-10 aspect-[1.43]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerComment;
