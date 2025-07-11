import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/myselect.css";
import CartIcon from "../pages/carticone";

function MySelect() {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  return (
    <div className="container">
      <div className="my-select-container">
        <img src={product.image} alt="" />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h4>{product.price}</h4>
        <div className="icon">
          <CartIcon product={product}/>
        </div>
      </div>
    </div>
  );
}

export default MySelect;
