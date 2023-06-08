export interface GroceryItemType {
    id: string;
    name: string;
    quantity: number;
}

export interface Ingredient {
    id: string;
    aisle: string;
    name: string;
}

export interface RecipeType {
    id: string;
    image: string;
    title: string;
    spoonacularSourceUrl: string;
    servings: number;
    readyInMinutes: number;
    usedIngredients: Ingredient[];
    extendedIngredients: Ingredient[];
}