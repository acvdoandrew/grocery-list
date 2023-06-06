import { useState, useEffect } from "react";
import GroceryForm from "./GroceryForm";
import GroceryList from "./GroceryList";
import GroceryItemType from "@/types";
import React from "react";



const GroceryPage = () => {
    const [items, setItems] = useState<GroceryItemType[]>([]);
    const [email, setEmail]  = useState('')

    const submitEmail = (email: string) => {
        localStorage.setItem('email', email);
    }


    useEffect(() => {
        const storedItems = localStorage.getItem('groceries');
        const savedEmail = localStorage.getItem('email');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('groceries', JSON.stringify(items));
        submitEmail(email)
    }, [items, email]);

    const addItem = (item: GroceryItemType) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const increment = (id: string) => {
        setItems(items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    };

    const decrement = async (id: string) => {
        setItems((items) => {
            return items.map((item) => {
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
        });
    };

  return (
    <div className="flex flex-col justify-center items-center py-8 text-3xl">
        <GroceryForm addItem={addItem} />
        <GroceryList items={items} increment={increment} decrement={decrement} />
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
    </div>
  )
}

export default GroceryPage