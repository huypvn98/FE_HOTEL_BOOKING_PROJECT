import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Radio,
  Row,
  Typography,
} from "antd";
import { Apple, Facebook, Google, Instagram, Location } from "iconsax-react";
import React from "react";
import LeftLine from "../../../image/Line 5.png";
import RightLine from "../../../image/Line 6.png";
import Building from "../../../image/building.png";
import HotelImage from "../../../image/Frame 186.png";
import { MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooking } from "../../../redux/slices/bookingSlice";
import moment from "moment";

const { Title, Text } = Typography;
const BookingCart = () => {
  const user = useSelector((state) => state.authSlice?.user);
  const role = user?.roles;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.BookingSlice?.loading);

  const handleProceed = () => {
    const checkInDate = localStorage.getItem("checkInDate");
    const checkOutDate = localStorage.getItem("checkOutDate");

    const currentDate = new Date();
    const bookingDate = currentDate.toISOString().split("T")[0];

    const bookingPayload = {
      // Add other necessary booking details here
      roomID: 8,
      customerID: user.userID,
      depositID: 1,
      bookingDate,
      fromDate: checkInDate,
      checkInDate,
      checkOutDate,
      bookingStatus: "pending",
      toDate: bookingDate,
    };
    dispatch(fetchBooking(bookingPayload));
  };

  const checkInDate = localStorage.getItem("checkInDate");
  const checkOutDate = localStorage.getItem("checkOutDate");
  const nights = localStorage.getItem("nights");
  const formattedCheckInDate = checkInDate
    ? moment(checkInDate).format("dddd, MMM D")
    : "Select Check-in Date";
  const formattedCheckOutDate = checkOutDate
    ? moment(checkOutDate).format("dddd, MMM D")
    : "Select Check-out Date";


  return (
    <div className="mt-[200px] px-28">
      <Row justify="space-between">
        <Col span={12}>
          <Card className="flex-col gap-6">
            <Row className="justify-between">
              <Title level={3}>
                Superior room - 1 double bed or 2 twin beds
              </Title>
              <Text className="text-[#a9b489] font-extrabold text-[32px]">
                $ 240 <span className="text-[14px]">/night</span>
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
                    Lemon Tree Premier Pune
                  </Title>
                  <Row align={"middle"}>
                    <Location size="16" variant="Bold" />
                    <Text>
                      Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Row className="mt-10 justify-around">
              <Col span={5}>
              <Title level={5}>{formattedCheckInDate}</Title>
                <Text type="secondary">Check-in</Text>
              </Col>
              <Col span={5}>
                <Row className="justify-around" align="middle">
                  <img className="w-10 h-2" src={LeftLine} alt="" />
                  <img src={Building} alt="" />
                  <img className="w-10 h-2" src={RightLine} alt="" />
                </Row>
              </Col>
              <Col span={5}>
              <Title level={5}>{formattedCheckOutDate}</Title>
                <Text type="secondary">Check-out</Text>
              </Col>
            </Row>
            <div
              className="mt-6 flex w-[80px] py-1 px-3"
              style={{ borderRadius: "15px", border: "1px solid #A1A1A1" }}
            >
              {nights} Night{nights !== "1" ? "s" : ""}
            </div>
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
                  <Input
                    className="rounded-none mb-4"
                    size="large"
                    placeholder="Phone Number"
                  ></Input>
                  <Text type="secondary">
                    We’ll call or text you to confirm your number. Standard
                    message and data rates apply. Privacy Policy
                  </Text>
                  <br />
                  <Button
                    className="w-full mt-5 rounded-none text-white"
                    style={{ background: "#1E91B6" }}
                    size="large"
                  >
                    Continue
                  </Button>
                  <Divider>Or</Divider>
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
                  <Button size="large" className="w-full mt-4">
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
                <Text>CVK Park Bosphorus...</Text>
                <Title style={{ margin: "0px" }} level={5}>
                  Superior room - 1 double bed or 2 twin beds
                </Title>
                <Row className="gap-1">
                  <div
                    className="rounded w-5 px-4 py-2 flex justify-center align-middle"
                    style={{ border: "1px solid var(--Mint-Green, #8DD3BB)" }}
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
            <Text>
              Your booking is protected by{" "}
              <span>
                <Text strong>PhonePe</Text>
              </span>{" "}
            </Text>
            <Divider></Divider>
            <Text strong>Price Details</Text>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Base Fare</Text>
              <Text strong>$240</Text>
            </Row>
            <Row className="mt-4" justify={"space-between"}>
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
            </Row>
            <Divider></Divider>
            <Row className="mt-4" justify={"space-between"}>
              <Text>Total</Text>
              <Text strong>$265</Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookingCart;
