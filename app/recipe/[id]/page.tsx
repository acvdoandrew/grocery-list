"use client"
import React, { useEffect, useState } from "react";
import { RecipeType } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface Params {
  params: {
    id: string;
  };
}

const Page: React.FC<Params> = ({ params }) => {
  const [recipe, setRecipe] = useState<Partial<RecipeType>>({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      if (!isFetched) {
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
          setIsFetched(true);
        } catch (error) {
          console.error('Error fetching recipe: ', error);
        }
      }
    }
    fetchRecipeInfo();
  });

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen font-light justify-center items-center">
        { recipe ? (
          <div className="flex flex-col gap-2 items-center">
              <div>
                <Image 
                  className="w-auto h-auto rounded-md"
                  src={recipe.image ?? ''} 
                  alt={recipe.title ?? ''} 
                  width={1200} 
                  height={1200}
                />
              </div>
            <h1 className="text-xl md:text-2xl lg:text-4xl">{recipe.title}</h1>
            <div className="flex flex-col items-center md:text-xl lg:text-2xl"><span className="font-bold">Ingredients:</span>
              <ul className="flex flex-col gap-2" >
              { recipe.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
              ))}
              </ul>
            </div>
            <p><span className="font-bold">Servings:</span> {recipe.servings}</p>
            <p><span className="font-bold">Preparation time:</span> {recipe.readyInMinutes} minutes</p>
            <Link href={recipe.spoonacularSourceUrl ?? ''} target="_blank" className="text-xl bg-slate-200 hover:bg-orange-400 rounded-md transition p-2" >More Information</Link>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <Link href="/" className="text-xl my-3 bg-slate-200  hover:bg-orange-400 rounded-md transition p-2">Go back Home</Link>
    </div>
  )
}

export default Page