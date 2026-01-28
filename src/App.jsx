import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitarra from './components/Guitarra'
import Footer from './components/Footer'
import { db } from './data/guitarras'

function App() {

  // Estado inicial del carrito desde LocalStorage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('carrito')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  // Agregar al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists] = {
        ...updatedCart[itemExists],
        cantidad: updatedCart[itemExists].cantidad + 1
      }
      setCart(updatedCart)
    } else {
      setCart([
        ...cart,
        {
          ...item,
          cantidad: 1
        }
      ])
    }
  }

  // Guardar carrito en LocalStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <Header 
        cart={cart}
        setCart={setCart}
      />
      
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitarra 
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
