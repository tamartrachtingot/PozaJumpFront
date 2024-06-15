import React from 'react';
import logo from './logo.svg';
import './App.css';
// import ButtonAppBar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import Routing from "./Routing";
import ShowItem from './features/Item/ShowItem';
import SignIn from './features/User/SignIn';
import SignUp from './features/User/SignUp';
import ShowCategory from './features/Category/GetCategory';
import HomePage from './app/HomePage';
import GetCategory from './features/Category/GetCategory';
import HomeManager from './app/homeManager';
import ManageCategory from './features/Category/ManageCategory';
import ManageItem from './features/Item/ManageItem';
import pic1 from "./backgroundimage.jpg";
import ManagerLend from './features/Lend/ManagerLend';

function App() {
  const myStyle={
//     backgroundImage: 
// "src('public\picture\stylePicture\background.jpg')",
backgroundImage: 'url(' + pic1 + ')',
    height:'100vh',
    marginTop:'0%',
 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (
    <div   style={myStyle} >
    <div className="App">
 
     <HomePage/>
      <Routes>
        <Route path="/GetCategory" element={<GetCategory/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/catgoryItem/:categoryId" element={<ShowItem/>}/>
        <Route path="/homeManager" element={<HomeManager/>}></Route>
        <Route path="/ManageCategory" element={<ManageCategory/>}></Route>
        <Route path="/ManageItem/:categoryId" element={<ManageItem/>}></Route>
        <Route path="/ManagerLend" element={<ManagerLend/>}></Route>
      </Routes>
  
    </div>
    </div>
  );
}

export default App;
