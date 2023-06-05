import React, { useState } from "react";
import GroceryItem from "@/types";
import { v4 as uuidv4 } from "uuid";

interface GroceryFormProps {
    addItem: (item: GroceryItem) => void;
};

const GroceryForm: React.FC<GroceryFormProps> = ({ addItem }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        addItem({
            id: uuidv4(),
            name,
            quantity
        });
        setName('');
        setQuantity(1);
    }

  return (
    <form className="flex flex-col justify-center items-center py-10" onSubmit={handleSubmit}>
        <input 
            className="my-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <input
            className="my-4" 
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
        />
        <button type="submit">Add Item</button>
    </form>
  )
}

export default GroceryForm
