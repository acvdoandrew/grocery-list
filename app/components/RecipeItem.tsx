import React from "react";
import { RecipeType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface RecipeItemProps {
    recipe: RecipeType;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  return (
    <div className="my-9">
        <Link key={recipe.id} href={`recipe/${recipe.id}`}>
            <h2>{recipe.title}</h2>
        </Link>
        {recipe.usedIngredients.map((ingredient) => (
            <div className="text-lg" key={ingredient.id}>
                <p>{ingredient.name} - <span>{ingredient.aisle}</span></p>
            </div>
        ))}
    </div>
  )
}

export default RecipeItem