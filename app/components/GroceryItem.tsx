import React from "react";
import { GroceryItemType } from "@/types";

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
        <div className="flex gap-4 text-5xl text-orange-400">
            <button className="hover:bg-slate-200 rounded-md" onClick={() => increment(item.id)}>+</button>
            <button className="hover:bg-slate-200 rounded-md" onClick={() => decrement(item.id)}>-</button>
        </div>
    </div>
  );
}

export default GroceryItem