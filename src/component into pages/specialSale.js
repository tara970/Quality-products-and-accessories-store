import React, { useEffect, useState } from "react";
import "../style/specialsale.css";
import womenClothe from "../images/women-clothes.jpg";

function SpecialSale() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // تاریخ هدف - مثلاً 10 تیر 1403 معادل با 2025-06-30
    const targetDate = new Date("2025-08-10T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({});
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sale-container">
      <div className="special">
        <img src={womenClothe} alt="" className="image" />
        <h3>منتظر فروش استثنایی باشید</h3>
        <p>روز شمار فروش</p>

        {timeLeft.days !== undefined ? (
          <div className="countdown">
            <div className="countdown-item">
              {timeLeft.days}
              <div className="countdown-item-label">روز</div>
            </div>
            <div className="countdown-item">
              {timeLeft.hours}
              <div className="countdown-item-label">ساعت</div>
            </div>
            <div className="countdown-item">
              {timeLeft.minutes}
              <div className="countdown-item-label">دقیقه</div>
            </div>
            <div className="countdown-item">
              {timeLeft.seconds}
              <div className="countdown-item-label">ثانیه</div>
            </div>
          </div>
        ) : (
          <p className="expired">فروش آغاز شده!</p>
        )}
      </div>
    </div>
  );
}

export default SpecialSale;
