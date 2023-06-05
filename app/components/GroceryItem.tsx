import React from "react";
import GroceryItemType from "@/types";

interface GroceryItemProps {
    item: GroceryItemType;
    increment: (id: string) => void;
    decrement: (id: string) => void;
};

const GroceryItem: React.FC<GroceryItemProps> = ({ item, increment, decrement }) => {
  return (
    <div>
        <h2>{item.name}</h2>
        <p>Quantity: {item.quantity}</p>
        <div className="flex gap-4 text-5xl text-white">
            <button onClick={() => increment(item.id)}>+</button>
            <button onClick={() => decrement(item.id)}>-</button>
        </div>
    </div>
  );
}

export default GroceryItem