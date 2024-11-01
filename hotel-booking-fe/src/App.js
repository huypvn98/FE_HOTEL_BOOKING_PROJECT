import { Route, Routes, useLocation } from "react-router";
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
//import { authSlice } from "./redux/selector.js";
//import { login } from "./redux/slices/authSlice.js";
import { testFunc } from "./redux/slices/testSlice.js";
import { testData } from "./redux/selector.js";
import HotelDetail from "./page/UserPages/RoomDetail/HotelDetail.jsx";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(testData);
  const pathname = location.pathname;
  useEffect(() => {
    dispatch(testFunc());
  }, []);
  console.log(data);
  return (
    <>
      {pathname.includes("/admin") ? (
        <AdminLayout>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </AdminLayout>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hoteldetail" element={<HotelDetail />} />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
