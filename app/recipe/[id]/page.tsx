"use client"
import React, { useEffect, useState } from "react";
import { RecipeType } from "@/types";

interface Params {
  params: {
    id: string;
  };
}

const Page: React.FC<Params> = ({ params }) => {
  const [recipe, setRecipe] = useState<Partial<RecipeType>>({});

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      try {
        const response = await fetch('/api/recipe-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params.id }),
        });
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const data = await response.json()
        setRecipe(data.recipeInfo);
      } catch (error) {
        console.error('Error fetching recipe: ', error);
      }
    }
    fetchRecipeInfo();
  });

  return (
    <div>
        { recipe ? (
          <div>
            <h1>{recipe.title}</h1>
          </div>
        ) : (
          <div>Loading...</div>
        )}
    </div>
  )
}

export default Page