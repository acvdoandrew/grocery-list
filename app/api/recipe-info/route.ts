import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const APIkey = process.env.SPOONACULAR_API_KEY ?? '';

export const POST = async (req: NextRequest) => {
    const { id } = await req.json();
    console.log(id);

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIkey}`, {
            params: {
                id: id,
                includeNutrition: false,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const recipeInfo = response.data;
        return NextResponse.json({ recipeInfo });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching recipe information' });
    }
};