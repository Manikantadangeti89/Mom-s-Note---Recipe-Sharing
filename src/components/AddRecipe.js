import React, { useState } from "react";
import axios from "axios";
import "./AddRecipe.css"; 

function AddRecipe() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/recipes", {
        title,
        imageUrl,
        ingredients: ingredients.split(","), 
        instructions,
      });

      if (response.status === 201) {
        setSuccess("Recipe added successfully!");
        setTitle("");
        setImageUrl("");
        setIngredients("");
        setInstructions("");
      }
    } catch (error) {
      console.error(error);
      setSuccess("Error adding recipe");
    }
  };

  return (
    <div className="add-recipe">
      <div className="Form-add">
        <h2 className="h2-add">Add Your Flavorful Creation</h2>
        {success && <p className={success.includes("Error") ? "error-msg" : "success-msg"}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <textarea
            placeholder="Ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
