import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const APIkey = process.env.SPOONACULAR_API_KEY ?? '';

export const POST = async (req: NextRequest) => {
    const { items } = await req.json();
    console.log(items);

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}`, {
            params: {
                ingredients: items.join(','),
                number: 5, // Limit to 10 results.
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const recipes = response.data;
        return NextResponse.json({ recipes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching recipes' });
    }

};