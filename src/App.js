import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import { Home, Product, SingleProduct, About, Cart, Error, Checkout, PrivateRoute, Sharepage } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Sharepage />}>
          <Route index element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/:id" element={<SingleProduct />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  )
}

export default App
