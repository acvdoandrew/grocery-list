import { useState, useEffect } from "react";
import GroceryForm from "./GroceryForm";
import GroceryList from "./GroceryList";
import RecipeList from "./RecipeList";
import { GroceryItemType, RecipeType } from "@/types";
import React from "react";



const GroceryPage = () => {
    const [items, setItems] = useState<GroceryItemType[]>([]);
    const [prevItems, setPrevItems] = useState<GroceryItemType[]>([]);
    const [email, setEmail]  = useState('');
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [isEmailSet, setEmailSet] = useState(false);

    const submitEmail = (email: string) => {
        localStorage.setItem('email', email);
        setEmailSet(true);
    }
    
    const fetchRecipes = async () => {
        try {
            // const response = await fetch('api/recipes', {
            //     cache: 'no-store',
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ items: items.map(item => item.name) }),
            // });    
            //  if (!response.ok) {
            //     throw new Error('Response not ok')
            // }
            // const data = await response.json();
            // setRecipes(data.recipes);

            // MOCK DATA
            const response = await fetch('/api/recipes.json');
            console.log(response)
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes: ', error);
        }
    }

    useEffect(() => {
        const storedItems = localStorage.getItem('groceries');
        const savedEmail = localStorage.getItem('email');
        if (storedItems) {
            const parsedItems = JSON.parse(storedItems)
            setItems(parsedItems);
            setPrevItems(parsedItems);
        }
        if (savedEmail) {
            setEmail(savedEmail);
            setEmailSet(true)
        }
        fetchRecipes();
    }, []);

    useEffect(() => {
        localStorage.setItem('groceries', JSON.stringify(items));
        if (prevItems.length > items.length) {
            fetchRecipes();
        }
        setPrevItems(items)
    }, [items, prevItems.length]);

    const addItem = (item: GroceryItemType) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const increment = (id: string) => {
        setItems(items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        console.log(recipes);
    };

    const decrement = async (id: string) => {
        setItems((items) => {
            const updatedItems = items.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0;
                    if (newQuantity === 0) {
                        fetch('/api/email', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ itemName: item.name, email: email }),
                        })
                        .then((response) => response.json())
                        .then((data) => console.log(data.message))
                        .catch((error) => console.error('Error: ', error))
                    }
                    return { ...item, quantity: newQuantity };
                } else {
                    return item;
                }
            });
            return updatedItems.filter(item => item.quantity > 0);
        });
    };

  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center py-8 text-3xl">
        <div className="flex flex-col justify-center items-center">
            <GroceryForm addItem={addItem} />
            <GroceryList items={items} increment={increment} decrement={decrement} />
            { isEmailSet ? (
                <button className="text-xl my-3 bg-slate-200  hover:bg-orange-400 rounded-md transition p-2" onClick={() =>{ setEmailSet(false); setEmail(''); }}>
                    Change Email?
                </button>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); submitEmail(email); }} className="flex flex-col justify-center items-center py-8 text-3xl">
                    <label className="flex flex-col text-lg md:text-xl lg:text-2xl mx-3">Enter your email and we will email you when an item runs out!:
                        <input 
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </label>
                    <input className="text-xl my-3 bg-slate-200  hover:bg-orange-400 rounded-md transition p-2 cursor-pointer" type="submit" value="Submit" />
                </form>
            )}
        </div>
        <div className="flex flex-col justify-center items-center">
            <RecipeList  recipes={recipes}  />
        </div>
    </div>
  )
}

export default GroceryPage