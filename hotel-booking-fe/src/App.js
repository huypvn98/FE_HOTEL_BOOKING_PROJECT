import { Route, Routes } from 'react-router';
import './App.css';
import DefaultLayout from './layout/DefaultLayout';
import Home from './page/Home/Home';
import Test from './page/Test/Test';

function App() {
  return (
    <DefaultLayout>
    <Routes>
      <Route path="/" element={<Home></Home>}/>
      <Route path="/test" element={<Test></Test>}/>
      <Route path="/shopping-cart" />
    </Routes>
  </DefaultLayout>
  );
}

export default App;
