import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddProduct from './screens/AddProduct'
import DetailProduct from './screens/DetailProduct'
import EditProduct from './screens/EditProduct'
import ShowProducts from './screens/ShowProducts'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ShowProducts />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
        <Route exact path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/products/:id" element={<DetailProduct />} />
        </Routes>
    </Router>
  )
}

  
  export default App
