import React, { useContext } from "react";
import { ProductContext } from "../component/productContext";
import CartIcon from "../pages/carticone";
import "../style/specialpage.css";

function SpecialPage() {
  const { products, getDiscountedPrice } = useContext(ProductContext);

  const active = (product) => {
    return (
      product.discount &&
      product.discount > 0 &&
      product.discountEnd &&
      new Date(product.discountEnd) > new Date()
    );
  };

  const product20Sale = products
    .filter((p) => p.rating?.rate > 3 && p.rating?.rate <= 4)
    .map((p) => ({ ...p, discount: 20 }));
  const product30Sale = products
    .filter((p) => p.rating?.rate > 4)
    .map((p) => ({ ...p, discount: 30 }));
  const dubleProducts = [...product20Sale, ...product30Sale];

  return (
    <div className="container-specialpage">
      {dubleProducts.map((duble) => {
         const discountActive = active(duble);
         const finallyPrice = discountActive ? getDiscountedPrice(duble) : duble.price;

         return <div className="special-page">
            <img src={duble.image} alt="" className="image-page"/>
            <h3 className="title-page-h">{duble.title}</h3>
            <span className="title-page-p">{duble.discount}%</span>
            
            {
                discountActive ? (
                    <p className="tooman">
                    <span>{finallyPrice.toFixed(2)}تومان</span>
                    </p>
                ):(
                    <p>{duble.price}</p>
                )
            }
            <CartIcon product={duble}/>
         </div>
      })}
    </div>
  );
}

export default SpecialPage;
