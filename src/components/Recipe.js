import React from 'react';
import { Link } from 'react-router-dom';
import './Recipe.css'; 

function Recipe({ recipe }) {
  const recipeId = recipe._id || recipe.id;
  
  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipeId}`}>
        <img src={recipe.image || recipe.imageUrl} alt={recipe.title} />
        <h3 className="recipe-title">{recipe.title}</h3>
      </Link>
    </div>
  );
}

export default Recipe;

