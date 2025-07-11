import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/bestsellerproduct.css";
import CartIcon from "../pages/carticone";
import { ProductContext } from "../component/productContext";

function BestSellerProduct() {
  const { products, getDiscountedPrice } = useContext(ProductContext);

  const isDiscountActive = (product) => {
    return (
      product.discount &&
      product.discount > 0 &&
      product.discountEnd &&
      new Date(product.discountEnd) > new Date()
    );
  };

  // فقط محصولات پر فروش (مثلاً دسته‌بندی خاص یا شرط خاص)
  const bestProducts = products.filter((p) => p.rating?.rate > 4.6); // به عنوان نمونه

  return (
    <div className="best-container">
      <div className="bsetproduct">
        <h1>محصولات پر فروش</h1>
        <div className="bsetproduct-grid">
          {bestProducts.map((best) => {
            const discountActive = isDiscountActive(best);
            const finalPrice = discountActive
              ? getDiscountedPrice(best)
              : best.price;

            return (
              <div key={best.id} className="bsetproduct-card">
                <Link to={`/product/${best.id}`} className="product-link">
                  <img src={best.image} alt={best.title} />
                  <p>{best.title}</p>

                  {discountActive ? (
                    <p>
                      <span className="old-price">{best.originalPrice} تومان</span>{" "}
                      <span className="discounted-price">{finalPrice.toFixed(0)} تومان</span>
                    </p>
                  ) : (
                    <p>{best.price} تومان</p>
                  )}
                </Link>
                <div className="cart-icon-wrapper">
                  <CartIcon product={best} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestSellerProduct;
