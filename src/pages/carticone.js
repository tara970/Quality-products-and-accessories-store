import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../component/productContext";
import { FaShoppingCart } from "react-icons/fa"; // آیکون سبد خرید

function CartIcon({product}) {
  const { cart, addToCart } = useContext(ProductContext);
  const navigate = useNavigate();



  const handleClick = () =>{
    addToCart(product);
    navigate('/cartshope');
  }

  return (
    <div className="cart-icon-container" onClick={handleClick}>
      <FaShoppingCart className="cart-icon" />
    </div>
  );
}

export default CartIcon;