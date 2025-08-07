import { useMemo } from "react";

export default function Header({ cart, setCart }) {
  const clearCart = () => setCart([]);
  const totalCart = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [cart]);

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div
              className="carrito"
            >
              <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {
                  cart.length == 0 ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            cart.map((cart, index) => (
                              <tr key={index}>
                                <td>
                                  <img className="img-fluid" src={`/img/${cart.image}.jpg`} alt="imagen guitarra" />
                                </td>
                                <td>SRV</td>
                                <td className="fw-bold">
                                  ${cart.price}
                                </td>
                                <td className="flex align-items-start gap-4">
                                  <button
                                    type="button"
                                    className="btn btn-dark"
                                  >
                                    -
                                  </button>
                                  {cart.quantity}
                                  <button
                                    type="button"
                                    className="btn btn-dark"
                                  >
                                    +
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      <p className="text-end">Total pagar: <span className="fw-bold">${totalCart}</span></p>
                      <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>Vaciar Carrito</button>
                    </>
                  )
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}


