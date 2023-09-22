import React from "react";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <div>
      <Header />
      <HomePage />
      <ProductList />
      <ProductDetail />
      <Cart />
      <Footer />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
