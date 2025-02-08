"use client";

import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";
import useBasketStore from "@/store/store";

interface AddToBasketButtonProps {
    product: Product;
    disabled: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) return null;

    return (
        <div className="flex items-center justify-center space-x-2">

            <button onClick={() => removeItem(product._id)}
                className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-200 ${itemCount === 0
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`} disabled={itemCount === 0 || disabled}
            >
                <span
                    className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>
                    -
                </span>
            </button>
            <span className="w-8 text-center font-semibold">{itemCount}</span>
            <button
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-200 ${itemCount === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                    }`} 
                    disabled={disabled}
            >
                <span className="text-xl font-bold text-white">+</span>
            </button>
        </div>
    )
}

export default AddToBasketButton
