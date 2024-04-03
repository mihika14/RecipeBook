import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams(); 
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=d848641355e748b58309270281893991`
        );
        setRecipeDetails(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleRatingSubmit = async () => {
    try {
      console.log(`Recipe ${id} rated with ${userRating} stars`);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <h1 className="recipe-header">{recipeDetails.title}</h1>
      <img
        className="recipe-image"
        src={recipeDetails.image}
        alt={recipeDetails.title}
      />
      
      <h2 className="ingredient">Ingredients:</h2>
      <ul className="ingredient-list">
        {recipeDetails.extendedIngredients.map((ingredient, index) => (
          <li className="items" key={index}>
            {ingredient.original}
          </li>
        ))}
      </ul>
      <h2 className="ingredient">Instructions:</h2>
      <div
        dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
        style={{
          color: "#ececeb",
          fontFamily: "Montserrat, sans-serif",
          display:"flex",
          justifyContent:"center",
          lineHeight:"35px"
        }}
      />
      <div className="rating">
        <p className="rate-header">Rate this recipe:</p>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label className='stars'key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setUserRating(ratingValue)}
              />
              <span className={ratingValue <= userRating ? "active" : ""}>{index+1}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
