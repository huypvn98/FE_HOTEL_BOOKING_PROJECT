import { Route, Routes } from "react-router";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout.jsx";
import Home from "./page/Home/Home";
import Test from "./page/Test/Test";
import Login from "./page/Login/Login";
import SignUp from "./page/SignUp/SignUp";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/test" element={<Test></Test>} />
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/shopping-cart" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
