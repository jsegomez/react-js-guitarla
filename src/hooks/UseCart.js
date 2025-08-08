import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";

export default function useCart() {
    const guitars = db;
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      }, [cart]);

    function addToCart(guitar) {
        setCart(prev => {
            const exists = prev.some(item => item.id === guitar.id);
            if (exists) {
                return prev.map(item =>
                    item.id === guitar.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...guitar, quantity: 1 }];
        });
    }

    function removeFromCart(guitarId) {
        setCart(prevCart => prevCart.filter(item => item.id !== guitarId));
    }

    function increaseQuantity(guitarId) {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === guitarId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    }

    function decreaseQuantity(guitarId) {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === guitarId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    }

    function clearCart() {
        setCart([]);
    }

    return {
        cart,
        guitars,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, 
        cartTotal
    }
}