import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"

import { useState } from "react"

import { db } from "./data/db";

function App() {
  const guitars = db;
  const [cart, setCart] = useState([]);
  // const [total, setTotal] = useState(0);

  return (
    <>
      <Header cart={ cart } setCart={ setCart }/>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map((guitar, index) => (
              <Guitar
                key={index}
                guitar={guitar}
                setCart={setCart}
                cart={cart}
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
