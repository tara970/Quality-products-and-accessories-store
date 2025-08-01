import React, { useContext } from "react";
import { ProductContext } from "../component/productContext";
import { useLocation } from "react-router-dom";
import "../style/trackorder.css";

const steps = [
  { title: "ثبت سفارش", key: "ordered" },
  { title: "آماده سازی", key: "processing" },
  { title: "تحویل به پیک", key: "shipped" },
  { title: "تحویل داده شده", key: "delivered" },
];

function TrackOrder() {
  const { orders } = useContext(ProductContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = Number(params.get("id"));
  const order = orders.find((o) => o.id === orderId);

  if (!order) return <p>سفارشی ثبت نشده</p>;

  const getStatusText = (steps) => {
    switch (steps) {
      case "ordered":
        return "ثبت سفارش";
      case "processing":
        return "در حال پردازش";
      case "shipped":
        return "ارسال شده";
      case "delivered":
        return "تحویل داده شده";
      default:
        return "نامشخص";
    }
  };

  const getDynamicStatus = (order) => {
    const now = new Date();
    const orderDate = new Date(order.orderDate);
    const deliveryDate = new Date(order.deliveryDate);

    // فاصله 3 ساعت فرضی برای ارسال به پیک
    const shippedThreshold = new Date(deliveryDate);
    shippedThreshold.setHours(shippedThreshold.getHours() - 3);

    if (now < orderDate) return "ordered";
    if (now >= orderDate && now < shippedThreshold) return "processing";
    if (now >= shippedThreshold && now < deliveryDate) return "shipped";
    if (now >= deliveryDate) return "delivered";

    return "ordered";
  };

  const currentStep = getDynamicStatus(order);

  return (
    <div className="trackorder">
      <div className="track-order-container">
        <h2>🔍 پیگیری سفارش</h2>
        <div className="timeline">
          {steps.map((step, index) => {
            const isActive =
              steps.findIndex((s) => s.key === currentStep) >= index;
            return (
              <div
                key={step.key}
                className={`timeline-step ${isActive ? "active" : ""}`}
              >
                <div className="circle">{index + 1}</div>
                <p>{step.title}</p>
              </div>
            );
          })}
        </div>

        <div className="order-details">
          <p>
            📅 تاریخ ثبت سفارش:{" "}
            {new Date(order.orderDate).toLocaleDateString("fa-IR")}
          </p>
          <p>
            🚚 تاریخ تحویل تخمینی:{" "}
            {new Date(order.deliveryDate).toLocaleDateString("fa-IR")}
          </p>
          <p>📝 وضعیت فعلی: {getStatusText(getDynamicStatus(order))}</p>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
