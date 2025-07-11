import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../component/productContext";
import CartIcone from "./carticone";
import "../style/searchproduct.css";

function SearchProduct() {
  const { query } = useParams();
  const { products } = useContext(ProductContext);

  const filterdProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="search">
      {filterdProducts.length > 0 ? (
        filterdProducts.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.category}</h3>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <h4 className="prc">{product.price} دلار</h4>
            <div className="cart-product">
              <CartIcone product={product} />
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>محصولی یافت نشد...</p>
      )}
    </div>
  );
}

export default SearchProduct;
