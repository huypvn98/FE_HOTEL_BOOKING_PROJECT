import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Radio,
  Row,
  Typography,
  DatePicker,
  QRCode,
  Modal,
} from "antd";
import { Apple, Facebook, Google, Location } from "iconsax-react";
import React, { useState, useEffect } from "react";
import LeftLine from "../../../image/Line 5.png";
import RightLine from "../../../image/Line 6.png";
import Building from "../../../image/building.png";
import HotelImage from "../../../image/Frame 186.png";
import { CheckCircleOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  createPaymentUrl,
  fetchBooking,
} from "../../../redux/slices/bookingSlice";
import moment from "moment";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";
import { fetchRoomById } from "../../../redux/slices/roomSlice";
import { hotelDetail, roomById } from "../../../redux/selector";
import { fetchHotelDetail } from "../../../redux/slices/hotelSlice";

const { Title, Text } = Typography;

const BookingCart = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.authSlice?.user);
  const room = useSelector(roomById);
  const roomLoading = useSelector((state) => state.roomSlice?.loading);
  const qrUrl = useSelector((state) => state.BookingSlice?.paymentUrl);

  const hotel = useSelector(hotelDetail);
  // const role = user?.roles;
  const users = JSON.parse(localStorage.getItem("user"));
  const role = users?.roles;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.BookingSlice?.loading);
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState(
    localStorage.getItem("checkInDate")
  );
  const [checkOutDate, setCheckOutDate] = useState(
    localStorage.getItem("checkOutDate")
  );
  const [nights, setNights] = useState(localStorage.getItem("nights"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nightsCount = moment(checkOutDate).diff(
        moment(checkInDate),
        "days"
      );
      setNights(nightsCount);
      localStorage.setItem("nights", nightsCount);
    }
  }, [checkInDate, checkOutDate]);
  console.log(roomLoading);
  useEffect(() => {
    // First, fetch the room details by ID
    dispatch(fetchRoomById(id));
  }, [dispatch, id]);
  useEffect(() => {
    // Once the room data is available, dispatch fetchHotelDetail
    if (room?.hotelID) {
      dispatch(fetchHotelDetail(room.hotelID));
    }
  }, [dispatch, room]); // Triggered whenever `room` changes
  const handleCheckInChange = (date) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : null;
    setCheckInDate(formattedDate);
    localStorage.setItem("checkInDate", formattedDate);
  };

  const handleCheckOutChange = (date) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : null;
    setCheckOutDate(formattedDate);
    localStorage.setItem("checkOutDate", formattedDate);
  };

  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setNights(null);
    localStorage.removeItem("checkInDate");
    localStorage.removeItem("checkOutDate");
    localStorage.removeItem("nights");
  };

  const handleProceed = () => {
    const currentDate = new Date();
    const bookingDate = currentDate.toISOString().split("T")[0];
    const total = room?.roomDetail?.pricePerNight * nights;
    const bookingPayload = {
      roomID: 7,
      userID: user.userID,
      contactID: user.userID,
      depositID: 1,
      bookingDate,
      fromDate: checkInDate,
      checkInDate,
      checkOutDate,
      bookingStatus: "da thanh toan",
      toDate: bookingDate,
      note: "da thanh toan truoc",
    };
    const paymentPayload = {
      amount: total * 100,
      transactionId: generateRandomId(),
      orderDescription: `Payment`,
      orderType: "service",
      // returnUrl: `${window.location.origin}/payment-response`
    };
    console.log("paymentPayload", paymentPayload);
    dispatch(fetchBooking(bookingPayload));
    dispatch(createPaymentUrl(paymentPayload));
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      setTimeout(() => {
        setIsModalOpen(false);
        setIsPaymentSuccessful(true);
      }, 3000);
      if (isPaymentSuccessful === true) {
        setTimeout(() => {
          setIsPaymentSuccessful(false);
        }, 2000);
      }
    }
  }, []);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formattedCheckInDate = checkInDate
    ? moment(checkInDate).format("dddd, MMM D")
    : "Select Check-in Date";
  const formattedCheckOutDate = checkOutDate
    ? moment(checkOutDate).format("dddd, MMM D")
    : "Select Check-out Date";

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  console.log(room);

  const handleNavigating = () => {
    const cart = {
      checkInDate,
      checkOutDate,
      id,
    };
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/login");
  };

  function generateRandomId(length = 10) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomId;
  }

  return (
    <div className="mt-[200px] px-28">
      <Row justify="space-between">
        <Col span={12}>
          <Card className="flex-col gap-6">
            <Row className="justify-between">
              <Title level={3}>
                {/* {room?.roomDetail?.roomType} -{" "}
                {room?.bedRooms[0]?.bed?.bedID === 1
                  ? "Single Bed"
                  : "Double Bed"} */}
              </Title>
              <Text className="text-[#a9b489] font-extrabold text-[32px]">
                {room?.roomDetail?.pricePerNight * 1000} VND{" "}
                <span className="text-[14px]">/night</span>
              </Text>
            </Row>
            <Card className="w-ful">
              <Row className="gap-8">
                <img
                  className="w-16 h-16"
                  src="https://s3-alpha-sig.figma.com/img/a8f8/a3bd/0fbb63b80b094364944041f8aa0cad46?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuEMjce9tMMZRxpoElR9nDrp1Qr6g2rlG8N5DGElcpfDZwO72qC8IyEKP7~Cif4u1O0PGv-xlBvIqCdJcRe3w9kMjJOuhvhyduMEgNTRCNFv4XmXP48oz7~tLNoCmL0HZdqD3pUEZdx0mlNEqMFHvX2loyP3Moip89bm8Qhy9Ic3ksgRbMwwa1nE5QMcRw1qbFzov0PkJ6lE-VcxEzHS8c6MTyScBWOr3IFDKho1fzPP~udOHFL3sDoKn64Y0Tbdajrvg67dCG~eafaqM2yaYztE1tL7D~BOL3mX0~mL8~9xjFUPbwp7vUddEZdjHsYjzTrEyb36VOzJ1xK3OtViMA__"
                  alt=""
                />
                <Col>
                  <Title level={4} style={{ margin: "0px" }}>
                    {hotel?.hotelName}
                  </Title>
                  <Row align={"middle"}>
                    <Location size="16" variant="Bold" />
                    <Text>{hotel?.address}</Text>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Row className="mt-10 justify-around">
              <Col span={5}>
                {checkInDate ? (
                  <>
                    <Title level={5}>{formattedCheckInDate}</Title>
                    <Text type="secondary">Check-in</Text>
                  </>
                ) : (
                  <DatePicker
                    onChange={handleCheckInChange}
                    placeholder="Select Check-in Date"
                    disabledDate={disabledDate}
                  />
                )}
              </Col>
              <Col span={5}>
                <Row className="justify-around" align="middle">
                  <img className="w-10 h-2" src={LeftLine} alt="" />
                  <img src={Building} alt="" />
                  <img className="w-10 h-2" src={RightLine} alt="" />
                </Row>
              </Col>
              <Col span={5}>
                {checkOutDate ? (
                  <>
                    <Title level={5}>{formattedCheckOutDate}</Title>
                    <Text type="secondary">Check-out</Text>
                  </>
                ) : (
                  <DatePicker
                    onChange={handleCheckOutChange}
                    placeholder="Select Check-out Date"
                    disabledDate={disabledDate}
                  />
                )}
              </Col>
            </Row>
            <div
              className="mt-6 flex w-[80px] py-1 px-3 justify-center items-center"
              style={{ borderRadius: "15px", border: "1px solid #A1A1A1" }}
            >
              {nights
                ? `${nights} Night${nights !== "1" ? "s" : ""}`
                : "0 night"}
            </div>
            <Button onClick={handleClearDates} className="mt-4">
              Clear Dates
            </Button>
          </Card>

          <Card className="mt-10 ">
            <Card className="bg-[#a9b489]">
              <Row className="justify-between">
                <Col span={7}>
                  <Title style={{ color: "white" }} level={5}>
                    Pay in full
                  </Title>
                  <Text style={{ color: "white" }}>
                    Pay the total and you are all set
                  </Text>
                </Col>
                <Radio></Radio>
              </Row>
            </Card>
            <Card className="mt-10">
              {role === "Customer" ? (
                <>
                  <Button
                    size="large"
                    className="w-full text-white"
                    style={{ background: "#a9b489" }}
                    onClick={handleProceed}
                    loading={loading}
                  >
                    Click to proceed
                  </Button>
                </>
              ) : (
                <>
                  <Title level={4}>Login or Sign up to book</Title>

                  <Row justify="space-around">
                    <Button size="large" className="w-56 rounded-none">
                      <Facebook color="blue" variant="Bold"></Facebook>
                    </Button>
                    <Button size="large" className="w-56 rounded-none">
                      <Google color="green" variant="Bold"></Google>
                    </Button>
                    <Button
                      size="large"
                      className="w-56 rounded-none border-[#1E91B6]"
                    >
                      <Apple color="black" variant="Bold"></Apple>
                    </Button>
                  </Row>
                  <Divider>Or</Divider>
                  <Button
                    onClick={handleNavigating}
                    size="large"
                    className="w-full mt-4"
                  >
                    <MailOutlined></MailOutlined> Continue with email
                  </Button>
                </>
              )}
            </Card>
          </Card>
        </Col>
        <Col span={7}>
          <Card>
            <Row justify="space-between">
              <Col>
                <img src={HotelImage} alt="" />
              </Col>
              <Col span={15}>
                <Row>
                  {room?.roomDetail?.roomType} -{" "}
                  {/* {room?.bedRooms[0]?.bed?.bedID === 1
                    ? "Single Bed"
                    : "Double Bed"} */}
                </Row>
                <Text>CVK Park Bosphorus...</Text>
                <Title style={{ margin: "0px" }} level={5}></Title>
                <Row className="gap-1">
                  <div
                    className="rounded w-5 px-4 py-2 flex justify-center align-middle"
                    style={{ border: "1px solid var(--Mint-Green, #a9b489)" }}
                  >
                    4.2
                  </div>
                  <Text strong className="flex items-center">
                    Very Good
                  </Text>
                  <Text className="flex items-center">54 reviews</Text>
                </Row>
              </Col>
            </Row>
            <Divider></Divider>
            <Text strong>Price Details</Text>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Base Fare</Text>
              <Text strong>{room?.roomDetail?.pricePerNight * 1000} VND</Text>
            </Row>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Nights</Text>
              <Text strong>x{nights}</Text>
            </Row>
            {/* <Row className="mt-4" justify={"space-between"}>
              <Text>Discount</Text>
              <Text strong>$0</Text>
            </Row>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Taxes</Text>
              <Text strong>$24</Text>
            </Row>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Service Fee</Text>
              <Text strong>$2</Text>
            </Row> */}
            <Divider></Divider>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Total</Text>
              <Text strong>
                {room?.roomDetail?.pricePerNight * 1000 * nights} VND
              </Text>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Scan to Confirm"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <Row justify={"center"}>
          <QRCode value={qrUrl} size={200} />
        </Row>
      </Modal>
      <Modal
        visible={isPaymentSuccessful}
        onCancel={() => {
          setIsPaymentSuccessful(false);
        }}
        footer={null}
        centered
      >
        <Row justify="center" align="middle">
          <Col>
            <CheckCircleOutlined
              style={{
                fontSize: "60px",
                color: "#52c41a",
                marginBottom: "20px",
              }}
            />
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Title level={3}>Payment Successful</Title>
            <Text>Your transaction has been completed successfully.</Text>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default BookingCart;
