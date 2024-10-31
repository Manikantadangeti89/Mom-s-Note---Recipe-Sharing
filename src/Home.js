import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import Home-specific CSS

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="quote">“Let your taste buds lead the way! Explore new flavors and culinary creations with every recipe.”</h1>
        <Link to="/recipes">
          <button className="recipe-button">Explore Recipes</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
