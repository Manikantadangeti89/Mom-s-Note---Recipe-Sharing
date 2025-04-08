import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Recipe from './Recipe';
import './RecipeList.css'; 

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (query) => {
    try {
      const dbResponse = await axios.get(`/api/recipes?query=${query}`); 
      const dbRecipes = dbResponse.data;

      const spoonacularResponse = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=b1295af4c5e9467badbcc92adcd835ad`
      );
      const apiRecipes = spoonacularResponse.data.results;

      const allRecipes = [...dbRecipes, ...apiRecipes];

      setRecipes(allRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes(''); 
  }, []);

  return (
    <div>
      <SearchBar onSearch={fetchRecipes} />
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id || recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
