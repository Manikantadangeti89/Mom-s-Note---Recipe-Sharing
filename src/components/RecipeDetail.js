import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError('');
  
      try {
        console.log("Fetching details for recipe ID:", id);
  
        try {
          const dbResponse = await axios.get(`http://localhost:5000/api/recipes/${id}`);
          if (dbResponse.data) {
            setRecipe({
              id: dbResponse.data._id, 
              title: dbResponse.data.title,
              image: dbResponse.data.imageUrl, 
              summary: dbResponse.data.instructions || "No instructions available.",
              ingredients: dbResponse.data.ingredients || [],
              instructions: dbResponse.data.instructions || ""
            });
            return;
          }
        } catch (dbError) {
          console.log("Not found in local DB, trying Spoonacular");
        }
  
        const spoonacularResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=b1295af4c5e9467badbcc92adcd835ad`
        );
        setRecipe({
          title: spoonacularResponse.data.title,
          image: spoonacularResponse.data.image,
          summary: spoonacularResponse.data.summary || "No summary available.",
          ingredients: spoonacularResponse.data.extendedIngredients.map((ing) => ing.original) || [],
        });
      } catch (err) {
        setError('Error fetching recipe details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-detail-title">{recipe.title}</h2>
      <img className="recipe-detail-image" src={recipe.image} alt={recipe.title} />
      <p className="recipe-detail-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      <h3>Ingredients:</h3>
      <ul className="recipe-detail-ingredients">
        {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
      </ul>
    </div>
  );
}

export default RecipeDetail;


