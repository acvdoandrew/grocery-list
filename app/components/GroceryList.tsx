import React from "react";
import GroceryItem from "./GroceryItem";
import { GroceryItemType } from "@/types";

interface GroceryListProps {
    items: GroceryItemType[];
    increment: (id: string) => void;
    decrement: (id: string) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ items, increment, decrement }) => {
  return (
    <div>
        {items.map((item) => (
            <GroceryItem key={item.id} item={item} increment={increment} decrement={decrement} />
        ))}
    </div>
  );
}

export default GroceryList