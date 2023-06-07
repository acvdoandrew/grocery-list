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
    usedIngredients: Ingredient[];
}