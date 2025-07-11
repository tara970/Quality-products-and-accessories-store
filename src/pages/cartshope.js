import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../component/productContext";
import "../style/cart.css";

function CartShope() {
  const {
    cart,
    removeToCart,
    updateCartQuantity,
    clearCart,
    getTotalPrice,
  } = useContext(ProductContext);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ⏰ ذخیره سفارش‌ها در localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ ثبت سفارش و محاسبه زمان تحویل
  const submitOrder = () => {
    const deliveryDays = 3; // مثلاً تحویل ۳ روزه
    const now = new Date();
    const deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + deliveryDays);

    const submitted = cart.map((item) => ({
      ...item,
      deliveredAt: deliveryDate.toISOString(), // زمان تحویل
    }));

    setOrders((prev) => [...prev, ...submitted]);
    clearCart();
  };

  // 🔍 بررسی تحویل شدن هر محصول
  const isDelivered = (product) => {
    const now = new Date();
    const deliveryDate = new Date(product.deliveredAt);
    return now >= deliveryDate;
  };

  // ⏳ چند روز باقی مانده؟
  const getRemainingDays = (product) => {
    const now = new Date();
    const deliveryDate = new Date(product.deliveredAt);
    const diff = Math.ceil((deliveryDate - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="container">
      <div className="cart-container">
        <h2>سبد خرید</h2>

        {cart.length === 0 && orders.length === 0 && (
          <p className="empty">سبد خرید شما خالی است.</p>
        )}

        {/* سبد خرید */}
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
              <button onClick={submitOrder}>ثبت سفارش</button>
            </div>
          </>
        )}

        {/* لیست سفارشات */}
        {orders.length > 0 && (
          <div className="delivered-section">
            <h3>سفارشات شما</h3>
            {orders.map((item) => (
              <div
                className={`cart-item ${isDelivered(item) ? "delivered" : ""}`}
                key={item.id}
              >
                <img src={item.image} alt={item.title} />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.price} تومان</p>

                  {isDelivered(item) ? (
                    <span className="delivered-label">تحویل داده شده است</span>
                  ) : (
                    <span className="pending-label">
                      تحویل تا {getRemainingDays(item)} روز آینده
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartShope;
