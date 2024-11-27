import React from "react";

const About = () => {
  return (
    <div className="mb-[160px] mt-[200px] px-[150px]">
      <p className="text-lg text-gray-800 mb-4">
        Welcome to <strong className="text-black">EasyStay Hotel Booking</strong> – your gateway to effortless, reliable, and secure hotel bookings. We are a student-driven project under the Exe201 subject, designed to simplify the way you find and book hotels. Our platform combines technology and convenience to bring you a seamless experience every time you travel.
      </p>
      <p className="text-lg text-gray-800 mb-6">
        At EasyStay, we understand that booking a hotel should be easy, fast, and stress-free. Whether you're planning a short getaway, a business trip, or a long vacation, we help you find the perfect accommodation that suits your budget and preferences. Our mission is to make your hotel search simple and efficient, so you can focus on what really matters – enjoying your trip.
      </p>

      <h2 className="text-2xl font-semibold text-black mb-4">What We Offer:</h2>
      <ul className="list-none space-y-3 text-lg text-gray-800 mb-6">
        <li><strong className="text-black">Comprehensive Search</strong>: Filter hotels by location, price, star rating, amenities, and guest reviews to find exactly what you're looking for.</li>
        <li><strong className="text-black">Secure Payment</strong>: Enjoy secure, hassle-free payments with transparent pricing.</li>
        <li><strong className="text-black">Customer Support</strong>: Our friendly support team is available to assist you with any questions before, during, and after your booking.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-black mb-4">Our Vision:</h2>
      <p className="text-lg text-gray-800 mb-6">
        To create a user-friendly, trustworthy, and innovative hotel booking platform that makes planning your travels as simple as possible.
      </p>

      <h2 className="text-2xl font-semibold text-black mb-4">Our Core Values:</h2>
      <ul className="list-none space-y-3 text-lg text-gray-800 mb-6">
        <li><strong className="text-black">Simplicity</strong>: We strive to make hotel bookings easy for everyone.</li>
        <li><strong className="text-black">Trust</strong>: Your security and satisfaction are our top priorities.</li>
        <li><strong className="text-black">Innovation</strong>: We are constantly improving to give you the best booking experience.</li>
        <li><strong className="text-black">Customer Focus</strong>: Your needs come first. We’re here to help, every step of the way.</li>
      </ul>

      <p className="text-lg text-gray-800">
        Thank you for choosing <strong className="text-black">EasyStay Hotel Booking</strong>! We look forward to helping you find the perfect place to stay.
      </p>
    </div>
  );
};

export default About;