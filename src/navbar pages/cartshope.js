import React, { useContext, useState } from "react";
import { ProductContext } from "../component/productContext";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
    deliveryDateInput,
    setDeliveryDateInput,
    deliveryTime,
    setDeliveryTime,
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const [orderTotal, setOrderTotal] = useState(0);

  return (
    <div className="my-container">
      <div className="cart-container">
        <h2>سبد خرید</h2>

        {cart.length === 0 && (
          <div className="empty">
            <p>سبد خرید شما خالی است.</p>
            {orders.length > 0 && (
              <p>
                مجموع سفارش‌های قبلی شما شامل{" "}
                <strong className="product-count-circle">
                  {orders.reduce(
                    (total, order) =>
                      total +
                      order.items.reduce((sum, item) => sum + item.quantity, 0),
                    0
                  )}
                </strong>{" "}
                محصول است
              </p>
            )}

            <Link
              to="/cartshope/orders"
              style={{ marginTop: "10px", position: "absolute" }}
            >
              سفارشات من
            </Link>
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
              <div className="date-time">
                <div className="date">
                  <label>تاریخ تحویل</label>
                  <DatePicker
                    className="datepicker"
                    value={deliveryDateInput}
                    onChange={(date) => setDeliveryDateInput(date?.toDate())}
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="custom-date-input"
                    format="YYYY/MM/DD"
                    calendarPosition="bottom-center"
                    placeholder="انتخاب تاریخ تحویل"
                  />
                </div>

                <div className="time">
                  <label>بازه زمانی تحویل</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => {
                      setDeliveryTime(e.target.value);
                    }}
                    required
                  >
                    <option value="">--بازه زمانی--</option>
                    <option value="9-12">9تا12 صبح</option>
                    <option value="12-15">12تا15ظهر</option>
                    <option value="15-18">15تا18 عصر</option>
                  </select>
                </div>
              </div>
              <button onClick={clearCart}>خالی‌کردن سبد</button>
              <button
                onClick={() => {
                  const orderTotals = cart.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  );
                  localStorage.setItem("totalorderlast", orderTotals);
                  setOrderTotal(orderTotals);
                  const success = placeOrder();
                  if (success) {
                    navigate("/cartshope/orders");
                    alert("سفارش شما ثبت شد");
                  }
                }}
              >
                ثبت سفارش
              </button>
              <Link to="/cartshope/orders">سفارشات من</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartShope;
