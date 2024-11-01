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
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=b1295af4c5e9467badbcc92adcd835ad`
        );
        setRecipe(response.data);
      } catch (err) {
        setError('Error fetching recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-detail-title">{recipe.title}</h2>
      <img className="recipe-detail-image" src={recipe.image} alt={recipe.title} />
      <p className="recipe-detail-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      <h3>Ingredients:</h3>
      <ul className="recipe-detail-ingredients">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
    </div>
  );
  
}

export default RecipeDetail;
