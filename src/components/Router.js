import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import AddRecipe from './AddRecipe';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
    </Routes>
  );
}

export default Router;
