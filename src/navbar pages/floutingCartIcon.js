import React, { useEffect, useState } from "react";
import "../style/floutingcarticon.css";
import { ProductContext } from "../component/productContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";

function FloutingCartIcon() {
  const { totalItems } = useContext(ProductContext);
  console.log("total is",totalItems);
  
  return (
    <div>
      <Link to="/cartshope/orders" className="floating-cart">
        <FaShoppingCart size={28} />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </Link>
    </div>
  );
}

export default FloutingCartIcon;
