import { useState, useEffect } from "react";
import GroceryForm from "./GroceryForm";
import GroceryList from "./GroceryList";
import GroceryItemType from "@/types";
import React from "react";

const GroceryPage = () => {
    const [items, setItems] = useState<GroceryItemType[]>([]);

    useEffect(() => {
        const storedItems = localStorage.getItem('groceries');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('groceries', JSON.stringify(items));
    }, [items])

    const addItem = (item: GroceryItemType) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const increment = (id: string) => {
        setItems(items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    };

    const decrement = (id: string) => {
        setItems(items.map((item) => item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item))
    };

  return (
    <div className="flex flex-col justify-center items-center py-8 text-3xl">
        <GroceryForm addItem={addItem} />
        <GroceryList items={items} increment={increment} decrement={decrement} />
    </div>
  )
}

export default GroceryPage