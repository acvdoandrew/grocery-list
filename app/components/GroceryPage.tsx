import { useState, useEffect } from "react";
import GroceryForm from "./GroceryForm";
import GroceryList from "./GroceryList";
import RecipeList from "./RecipeList";
import { GroceryItemType, RecipeType } from "@/types";
import React from "react";



const GroceryPage = () => {
    const [items, setItems] = useState<GroceryItemType[]>([]);
    const [email, setEmail]  = useState('');
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [isEmailSet, setEmailSet] = useState(false);

    const submitEmail = (email: string) => {
        localStorage.setItem('email', email);
        setEmailSet(true);
    }
    
    const fetchRecipes = async () => {
        try {
            const response = await fetch('api/recipes', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: items.map(item => item.name) }),
            });    
             if (!response.ok) {
                throw new Error('Response not ok')
            }
            const data = await response.json();
            setRecipes(data.recipes);
        } catch (error) {
            console.error('Error fetching recipes: ', error);
        }
    }

    useEffect(() => {
        const storedItems = localStorage.getItem('groceries');
        const savedEmail = localStorage.getItem('email');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
        if (savedEmail) {
            setEmail(savedEmail);
            setEmailSet(true)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('groceries', JSON.stringify(items));
    }, [items]);

    const addItem = async (item: GroceryItemType) => {
        setItems((prevItems) => [...prevItems, item]);
        await fetchRecipes();
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
        await fetchRecipes();
    };

  return (
    <div className="flex flex-col justify-center items-center py-8 text-3xl">
        <GroceryForm addItem={addItem} />
        <GroceryList items={items} increment={increment} decrement={decrement} />
        { isEmailSet ? (
            <button onClick={() =>{ setEmailSet(false); setEmail(''); }}>
                Change Email?
            </button>
        ) : (
            <form onSubmit={(e) => { e.preventDefault(); submitEmail(email); }} className="flex flex-col justify-center items-center py-8 text-3xl">
                <label>Enter your email and we will email you when an item runs out!:
                    <input 
                        type="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )}
        <RecipeList recipes={recipes}  />
    </div>
  )
}

export default GroceryPage