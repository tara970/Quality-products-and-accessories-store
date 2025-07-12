import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import CategoryProducts from "./pages/categoryProducts";
import SearchProduct from "./pages/searchProduct";
import MainPage from "./navbar pages/main-page";
import AllProducts from "./navbar pages/all-products";
import AboutUs from "./navbar pages/about-us";
import ContactUs from "./navbar pages/contact-us";
import Navigation from "./navbar pages/navigation";
import Navbar from "./navbar pages/navbar";
import CartShope from "./navbar pages/cartshope";

const ProductsLayout = () => {
  return (
    <>
      <Navbar />
      <Navigation />

      <Routes>
        <Route path="" element={<Products />} />
        <Route path="main-page" element={<MainPage />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="search/:query" element={<SearchProduct />} />
        <Route path="category/:categoryName" element={<CategoryProducts />} />
        <Route path="cartshope" element={<CartShope/>} />
      </Routes>
    </>
  );
};

export default ProductsLayout;