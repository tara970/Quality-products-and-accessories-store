import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/allproducts.css"; // ← این مسیر باید درست باشه
import { Link } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="all-products-container">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.title} />
          <Link to={`/all-products/${p.id}`}>
            <h3>{p.title}</h3>
          </Link>
          <p>{p.description}</p>
          <h4>${p.price}</h4>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
