import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "../style/selectedproduct.css";
import CartIcon from "../pages/carticone";
import { ProductContext } from "../component/productContext";

function SelectedProduct() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const bestProducts = products.filter((p) => p.rating?.rate > 4.6);
  const product = bestProducts.find((p) => p.id === Number(id));

  if (!product) return <p>محصولی با این شناسه پیدا نشد.</p>;

  return (
    <div className="container">
      <div className="selected-product-container">
        <img src={product.image} alt={product.productName} />
        <h2>{product.productName}</h2>
        <p>{product.price} دلار</p>
        <p>{product.description}</p>
        <div className="carticon">
          <CartIcon product={product} />
        </div>
      </div>
    </div>
  );
}

export default SelectedProduct;
