import React, { useState } from 'react';
import axios from 'axios';
import './AddRecipe.css'; // Importing individual CSS file for AddRecipe

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    try {
      const response = await axios.post('https://your-api-endpoint.com/recipes', {
        title,
        image,
        summary,
      });
      
      if (response.status === 201) {
        setSuccess('Recipe added successfully!');
        setTitle('');
        setImage('');
        setSummary('');
      }
    } catch (error) {
      console.error(error);
      setSuccess('Error adding recipe');
    }
  };

  return (
    <div className="add-recipe">
      <div className="Form-add">
      <h2 className="h2-add">Add Your Flavorful Creation</h2>
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
      </div>
      
    </div>
  );
}

export default AddRecipe;
