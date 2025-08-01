import React, { useContext, useState } from "react";
import { ProductContext } from "../component/productContext";
import "../style/userorder.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { order } from "@mui/system";

function UserOrders() {
  const { orders, user, setOrders } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleSearchInter = (e) => {
    if (e.key === "Enter" && search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      const matchOrders = orders.filter((order) =>
        order.items?.some((item) =>
          item.title?.toLowerCase().includes(searchTerm)
        )
      );
      console.log(matchOrders);

      const matchOrder = matchOrders[0];

      if (!matchOrder) {
        alert("محصولی یافت نشد..");
      }

      navigate(`/cartshope/orders/trackorder?id=${matchOrder.id}`);
      setSearch("");
    }
  };

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
          orders
            .map((order) => ({
              ...order,
              items: Array.isArray(order.items)
                ? order.items.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                  )
                : [],
            }))
            .filter((order) => order.items.length > 0)
            .map((order) => (
              <div key={order.id} className="order-card">
                <div className="btn-input">
                  <button onClick={handleClick}>
                    <SearchIcon />
                  </button>
                  {showInput && (
                    <input
                      value={search}
                      type="text"
                      placeholder="جستوجو بر اساس نام"
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleSearchInter}
                    />
                  )}
                </div>
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
                    className={`order-item ${
                      item.delivered ? "delivered" : ""
                    }`}
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
