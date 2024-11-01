import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout.jsx";
import Home from "./page/UserPages/Home/Home.jsx";
import Test from "./page/Test/Test";
import Login from "./page/UserPages/Login/Login.jsx";
import SignUp from "./page/UserPages/SignUp/SignUp.jsx";
import AdminLayout from "./layout/AdminLayout/AdminLayout.jsx";
import Dashboard from "./page/AdminPages/Dashboard.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomManagement from "./page/AdminPages/HotelManagement/OwnerManagement.jsx";
import BookingDetail from "./page/AdminPages/BookingDetail/BookingDetail.jsx";
import UserManagement from "./page/AdminPages/UserManagement/UserManagement.jsx";
import RefundManagement from "./page/AdminPages/RefundManagement/RefundManagement.jsx";
import RoomDetail from "./page/UserPages/RoomDetail/RoomDetail.jsx";
import HotelRoomManagement from "./page/AdminPages/HotelRoomManagement/RoomManagement.jsx";
import HotelPage from "./page/UserPages/HotelPage/Hotel.jsx";
import UserProfile from "./page/UserPages/Profile/UserProfile.jsx";
import { FloatButton } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import BookingCart from "./page/UserPages/BookingCart/BookingCart.jsx";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Import fetchUserDetails
import HotelDetail from "./page/UserPages/RoomDetail/HotelDetail.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authSlice?.isAuthenticated
  ); // Get isAuthenticated from the Redux store
  const user = useSelector((state) => state.authSlice?.user); // Get user from the Redux store
  const pathname = location.pathname;
  const isAdmin = user?.roles === "Admin";
  const isCustomer = user?.roles === "Customer";

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin && pathname === "/login") {
        navigate("/admin/dashboard");
      } else if (isCustomer && pathname === "/login") {
        navigate("/");
      } else if (pathname === "/login" || pathname === "/signup") {
        navigate("/"); // Navigate to home if authenticated and on login/signup page
      }
    }
  }, [isAuthenticated, user, pathname, navigate]);

  return (
    <>
      {isAdmin ? (
        <AdminLayout>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/owner-management"
              element={<RoomManagement />}
            />
            <Route path="/admin/booking-detail" element={<BookingDetail />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route
              path="/admin/refund-management"
              element={<RefundManagement />}
            />
            <Route
              path="/admin/room-management"
              element={<HotelRoomManagement />}
            />
            <Route path="/admin/room-management/:id" element={<RoomDetail />} />
          </Routes>
        </AdminLayout>
      ) : (
        <DefaultLayout isHomePage={pathname === "/"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotel/detail/:id" element={<HotelDetail />} />
            <Route path="/hotel" element={<HotelPage />} />
            <Route path="/profile/:id" element={<UserProfile />} />
          </Routes>
        <>
          <DefaultLayout isHomePage={pathname === "/"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/hotel" element={<HotelPage />} />
              <Route path="/roomdetail" element={<RoomDetail />} />
              <Route path="/bookingcart" element={<BookingCart />} />

              <Route path="/profile/:id" element={<UserProfile />} />
            </Routes>
          </DefaultLayout>
          <FloatButton
            shape="circle"
            badge={{
              dot: true,
            }}
            icon={<ShoppingCartOutlined />}
          />
        </DefaultLayout>
      )}
    </>
   
  );
}

export default App;
