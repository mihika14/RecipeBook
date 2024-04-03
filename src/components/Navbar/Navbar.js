import React from "react";
import './Navbar.css'
import { IoFastFood } from "react-icons/io5";
import { Link } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import RecipeDetails from "../Recipe Details/RecipeDetails";
export default function Navbar() {
  return (
    <div>
      <nav class="nav-bar">
        <div class="icon-nav">
           <IoFastFood style={{color:"white", fontSize:"25px"}}/>
            <span class="logo">Explore 100+ recipes</span>
        </div>

        <ul class="list-nav-bar active">
            <li class="list-item"><Link to = '/'>home</Link></li>
            <li class="list-item"><Link to = '/recipe/:id'>Recipe Details</Link></li>
        </ul>
        <div class="fas burger-menu" id="burger-menu">&#9776;</div>
    </nav>
    </div>
  );
}
