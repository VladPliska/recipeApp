import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


import { ResponsiveNavbar } from "react-hamburger-menus";
import "react-hamburger-menus/dist/style.css";

import logoImage from "../components/recipeApp.png";


export const Navbar = () => {

  
  const [cookies, setCookies]=useCookies(["access_token"]);
  const navigate=useNavigate();

  const logout=()=>{
    setCookies("access_token", ""); //make cookies empty
    window.localStorage.clear(); //delete id from local storage
    navigate("/auth"); //after logout navigate to auth page
  }


  return (
    <>
      <ResponsiveNavbar

        logo={
          <div>
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: "70px", height: "60px" }}
          />
          <span style={{ marginLeft: '10px', fontSize: '18px',position: 'relative', top: '-17px' }}> MERN-Recipe </span> 
          </div>
        }

        styles={{
          navigation: { fontFamily: "cursive, Helvetica, sans-serif",height: '50px' },
          navigationBarLarge: { backgroundColor: "aliceblue"   },
          navigationBarSmall: {
            backgroundColor: "aliceblue",
          },
          navigationCardSmall: {
            backgroundColor: "aliceblue",
          },

        }}
      >

        <ul style={{ fontSize: '14px' }}>
          <li>
            <Link to="/" > Home </Link>
          </li>
          <li>
            <Link to="/createRecipes"> CreateRecipes </Link>
          </li>
          <li>
            <Link to="/savedRecipes"> SavedRecipes </Link>
          </li>
          {
            !cookies.access_token ?
             (<li> <Link to="/auth" > Auth </Link> </li> ) : 
             ( <button onClick={logout} style={{fontFamily:"cursive", fontSize: "14px",marginRight:"25px", borderRadius: "25px" , padding: "5px 10px",backgroundColor: "orange"}} > Logout </button> )
          }  

        </ul>
      </ResponsiveNavbar>
    </>
  );
};
