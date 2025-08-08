import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"

import { useEffect, useState } from "react"
import { db } from "./data/db";

function App() {
  const guitars = db;  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(guitar) {    
    const isDuplicated = cart.some(item => item.id === guitar.id);        
    
    if (isDuplicated) {
      const updatedCart = cart.map(item => {
        if (item.id === guitar.id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      setCart(updatedCart);
    }else{
      const newElement = { quantity: 1, ...guitar };
      setCart([...cart, newElement]);
    }
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

  function clearCart(){
    setCart([]);
  }

  
  return (
    <>
      <Header
        cart={ cart } 
        setCart={ setCart }        
        removeFromCart={ removeFromCart }
        increaseQuantity={ increaseQuantity }
        decreaseQuantity={ decreaseQuantity }
        clearCart={ clearCart }
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map((guitar) => (
              <Guitar
                key={guitar.id}
                addToCart={addToCart}                
                guitar={guitar}                                
              />
            ))
          }
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
