import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/selected.css";
import CartIcon from "../pages/carticone";

function Selected() {
  const { id } = useParams();
  const [select, setSelect] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setSelect(res.data);
    });
  }, [id]);

  if (!select) return <p>...درحال بارگزاری</p>;

  return (
    <div className="selected-container">
      <div className="selected-card">
        <img src={select.image} alt={select.title} className="selected-image" />
        <div className="selected-info">
          <h2>{select.title}</h2>
          <p className="selected-price">{select.price} دلار</p>
          <p className="selected-desc">{select.description}</p>
          <div className="icon">
            <CartIcon product={select}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selected;
