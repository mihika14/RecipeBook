import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { fetchUserData } from "./components/ApiData";
import RecipeDetails from "./components/Recipe Details/RecipeDetails";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
}

export default App;
