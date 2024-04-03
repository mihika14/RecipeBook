import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Homepage.css";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function HomepageCard() {
  const [recipeData, setRecipeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
  });

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        let apiUrl =
          "https://api.spoonacular.com/recipes/random?number=100&apiKey=d848641355e748b58309270281893991";
        if (searchQuery) {
          apiUrl += `&query=${searchQuery}`;
        }
        const response = await axios.get(apiUrl);
        const recipes = response.data.recipes.filter((recipe) => recipe.image);
        setRecipeData(recipes);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipeData();
  }, [searchQuery, categoryFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter({
      ...categoryFilter,
      [category]: !categoryFilter[category],
    });
  };

  const saveFavoriteRecipe = (recipeId) => {
    console.log(`Recipe ${recipeId} saved as favorite`);
  };

  return (
    <div className="homepage-container">
      <div className="search-filter-container">
        <div className="group">
          <div className="icon">
            <CiSearch />
          </div>
          <input
            className="search"
            type="text"
            placeholder="Search "
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="category-filters">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={categoryFilter.vegetarian}
              onChange={() => handleCategoryChange("vegetarian")}
            />
            Vegetarian
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={categoryFilter.vegan}
              onChange={() => handleCategoryChange("vegan")}
            />
            Vegan
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={categoryFilter.glutenFree}
              onChange={() => handleCategoryChange("glutenFree")}
            />
            Gluten-Free
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={categoryFilter.dairyFree}
              onChange={() => handleCategoryChange("dairyFree")}
            />
            Dairy-Free
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={categoryFilter.veryHealthy}
              onChange={() => handleCategoryChange("veryHealthy")}
            />
            Very Healthy
          </label>
        </div>
      </div>

      <div className="homepage-card">
        {recipeData.map((recipe) => (
          <div key={recipe.id} className="card">
            <img className="card__img" src={recipe.image} alt={recipe.title} />
            <div className="card__descr-wrapper">
              <p className="card__title">{recipe.title}</p>
              <p className="card__details">
                Prepares in {recipe.readyInMinutes} mins & serves for{" "}
                {recipe.servings}
              </p>

              <p className="card__descr">
                {recipe.summary.split(" ").slice(0, 20).join(" ")}
              </p>
              <div className="card__links">
                <div>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className="link">Read more</span>
                  </Link>
                </div>
                <button
                  onClick={() => saveFavoriteRecipe(recipe.id)}
                  className="favorite-button"
                >Add to favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
