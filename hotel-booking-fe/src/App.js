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
import { testFunc } from "./redux/slices/testSlice.js";
import { testData } from "./redux/selector.js";
import RoomManagement from "./page/AdminPages/HotelManagement/OwnerManagement.jsx";
import BookingDetail from "./page/AdminPages/BookingDetail/BookingDetail.jsx";
import UserManagement from "./page/AdminPages/UserManagement/UserManagement.jsx";
import RefundManagement from "./page/AdminPages/RefundManagement/RefundManagement.jsx";
import HotelRoomManagement from "./page/AdminPages/HotelRoomManagement/RoomManagement.jsx";
import RoomDetail from "./page/AdminPages/HotelRoomManagement/RoomDetail.jsx";
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(testData);
  const isAuthenticated = useSelector((state) => state.authSlice?.isAuthenticated); // Get isAuthenticated from the Redux store
  console.log("check isAuthenticated", isAuthenticated);
  const pathname = location.pathname;

  useEffect(() => {
    dispatch(testFunc());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
      navigate("/"); // Navigate to home if authenticated and on login/signup page
    }
  }, [isAuthenticated, pathname, navigate]);

 
  console.log("check data", data);

  return (
    <>
      {pathname.includes("/admin") ? (
        <AdminLayout>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/owner-management" element={<RoomManagement />} />
            <Route path="/admin/booking-detail" element={<BookingDetail />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/refund-management" element={<RefundManagement />} />
            <Route path="/admin/room-management" element={<HotelRoomManagement />} />
            <Route path="/admin/room-management/:id" element={<RoomDetail />} />
          </Routes>
        </AdminLayout>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;