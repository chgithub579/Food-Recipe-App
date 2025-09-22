import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const [item, setItem] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    if (recipeId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then(res => res.json())
        .then(data => setItem(data.meals[0]));
    }
  }, [recipeId]);

  if (!item) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const strYoutube = item.strYoutube;
  const videoId = strYoutube ? strYoutube.split("=")[1] : "";

  return (
    <div className="recipe-container">
      {/* Recipe Image */}
      <img src={item.strMealThumb} alt={item.strMeal} className="recipe-image" />

      {/* Ingredients */}
      <div className="ingredients">
        <h2>Ingredients</h2>
        {[...Array(20).keys()].map(i => {
          const ingredient = item[`strIngredient${i + 1}`];
          const measure = item[`strMeasure${i + 1}`];
          return (
            ingredient && (
              <p key={i}>
                {ingredient}: {measure}
              </p>
            )
          );
        })}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h2>Instructions</h2>
        <p>{item.strInstructions}</p>
      </div>

      {/* Video */}
      {videoId && (
        <div className="video">
          <h2>Video Tutorial</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="recipeVideo"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Recipe;
