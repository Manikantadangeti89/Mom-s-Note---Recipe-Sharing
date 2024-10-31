import React from 'react';
import { Link } from 'react-router-dom';
import './Recipe.css'; // Ensure this file is imported

function Recipe({ recipe }) {
  return (
    <div className="recipe-card"> {/* Add the recipe-card class here */}
      <Link to={`/recipes/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.title} />
        <h3 className="recipe-title">{recipe.title}</h3>
      </Link>
    </div>
  );
}

export default Recipe;
