import React, { useContext } from "react";
import { ProductContext } from "../component/productContext";
import "../style/userorder.css";

function UserOrders() {
  const { orders, user, setOrders } = useContext(ProductContext);

  const markAsDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "تحویل داده شد" } : order
      )
    );
  };

  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  if (!user) return <p className="please-login">لطفاً وارد شوید تا سفارشات خود را ببینید.</p>;

  return (
    <div className="all-order">
      <div className="order-container">
        <h2>📦 سفارشات من</h2>

        {orders.length === 0 ? (
          <p className="no-orders">هنوز سفارشی ثبت نکرده‌اید.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <p>📅 تاریخ ثبت: {new Date(order.orderDate).toLocaleDateString("fa-IR")}</p>
                <p>🚚 تاریخ تحویل: {new Date(order.deliveryDate).toLocaleDateString("fa-IR")}</p>
                <p>📝 وضعیت: {order.status}</p>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <p className="item-title">{item.title}</p>
                      <p>تعداد: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button
                  className="btn-delivered"
                  onClick={() => markAsDelivered(order.id)}
                  disabled={order.status === "تحویل داده شد"}
                >
                  ✅ تحویل داده شد
                </button>
                <button className="btn-remove" onClick={() => removeOrder(order.id)}>
                  ❌ حذف سفارش
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserOrders;
