import { useMemo } from "react"

export default function Header({ cart, setCart }) {

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.cantidad * item.precio, 0),
    [cart]
  )

  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.cantidad < 10
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    ))
  }

  const decreaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ))
  }

  const removeItem = (id) =>
    setCart(cart.filter(item => item.id !== id))

 
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-between">
          
          <div className="col-8 col-md-3">
            <img className="img-fluid" src="/img/logo.svg" alt="logo" />
          </div>

          <nav className="col-md-6 mt-5 d-flex justify-content-end">
            <div className="carrito">
              <img className="img-fluid" src="/img/carrito.png" alt="carrito" />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center m-0">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cant.</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => (
                          <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>${item.precio}</td>
                            <td>
                              <button onClick={() => decreaseQuantity(item.id)}>-</button>
                              {item.cantidad}
                              <button onClick={() => increaseQuantity(item.id)}>+</button>
                            </td>
                            <td>
                              <button onClick={() => removeItem(item.id)}>X</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end fw-bold">
                      Total: ${cartTotal}
                    </p>

                    <button
                      className="btn btn-dark w-100"
                      onClick={() => setCart([])}
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

