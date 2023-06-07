import React from "react"
import { RecipeType } from "@/types"
import RecipeItem from "./RecipeItem";

interface RecipeListProps {
    recipes: RecipeType[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div>
        {recipes.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
    </div>
  )
}

export default RecipeList