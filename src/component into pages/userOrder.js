import React, { useContext } from "react";
import { ProductContext } from "../component/productContext";
import "../style/userorder.css";
import { Link } from "react-router-dom";

function UserOrders() {
  const { orders, user, setOrders } = useContext(ProductContext);

  const markItemAsDelivered = (orderId, itemId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId ? { ...item, delivered: true } : item
              ),
            }
          : order
      )
    );
  };

  const isDeliveryTimeReached = (deliveryDate) => {
    const now = new Date();
    const delivery = new Date(deliveryDate);
    return now >= delivery;
  };

  const removeDeliveredItem = (orderId, itemId) => {
    setOrders(
      (prevOrders) =>
        prevOrders
          .map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  items: order.items.filter((item) => item.id !== itemId),
                }
              : order
          )
          .filter((order) => order.items.length > 0) // اگه همه آیتم‌ها حذف شدن، کل سفارش حذف شه
    );
  };

  if (!user)
    return (
      <p className="please-login">لطفاً وارد شوید تا سفارشات خود را ببینید.</p>
    );

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
                <p>
                  📅 تاریخ ثبت:{" "}
                  {new Date(order.orderDate).toLocaleDateString("fa-IR")}
                </p>
                <p>
                  🚚 تاریخ تحویل:{" "}
                  {new Date(order.deliveryDate).toLocaleDateString("fa-IR")}
                </p>
                <Link to={`/cartshope/orders/trackorder?id=${order.id}`}>
                  📍 مشاهده وضعیت سفارش
                </Link>
              </div>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className={`order-item ${item.delivered ? "delivered" : ""}`}
                >
                  <div className="item-content">
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <p className="item-title">{item.title}</p>
                      <p>تعداد: {item.quantity}</p>
                    </div>
                  </div>

                  {item.delivered && (
                    <div className="overlay">
                      <button
                        className="remove-item-btn"
                        onClick={() => removeDeliveredItem(order.id, item.id)}
                      >
                        ❌
                      </button>
                    </div>
                  )}

                  {!item.delivered && (
                    <button
                      className="btn-delivered"
                      onClick={() => markItemAsDelivered(order.id, item.id)}
                      disabled={!isDeliveryTimeReached(order.deliveryDate)}
                    >
                      تحویل داده شد
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserOrders;
