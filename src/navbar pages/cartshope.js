import React, { useContext } from "react";
import { ProductContext } from "../component/productContext";
import { Link , useNavigate } from "react-router-dom";
import "../style/cart.css";

function CartShope() {
  const {
    cart,
    removeToCart,
    updateCartQuantity,
    clearCart,
    getTotalPrice,
    orders,
    placeOrder,
  } = useContext(ProductContext);

  const navigate = useNavigate();

  return (
    <div className="my-container">
      <div className="cart-container">
        <h2>سبد خرید</h2>

        {cart.length === 0 && (
          <div className="empty">
            <p>سبد خرید شما خالی است.</p>
            <Link to="/cartshope/orders">سفارشات من</Link>
          </div>
        )}

        {/* ✅ نمایش سبد خرید */}
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>{item.price} تومان</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateCartQuantity(item.id, parseInt(e.target.value))
                }
              />
              <button onClick={() => removeToCart(item.id)}>حذف</button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="cart-total">
              <h3>مبلغ نهایی: {getTotalPrice().toFixed(0)} تومان</h3>
            </div>
            <div className="cart-footer">
              <button onClick={clearCart}>خالی‌کردن سبد</button>
              <button onClick={()=>{ placeOrder(); navigate("/cartshope/orders") }}>ثبت سفارش</button>
              <Link to="/cartshope/orders">سفارشات من</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartShope;
