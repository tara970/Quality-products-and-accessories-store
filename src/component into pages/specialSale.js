import React, { useEffect, useState } from "react";
import "../style/specialsale.css";
import womenClothe from "../images/women-clothes.jpg";
import { Link, useNavigate } from "react-router-dom";

function SpecialSale() {
  const [timeLeft, setTimeLeft] = useState({});
  const [expired, setExpired] = useState(false);
  const [time, setTime] = useState(null);
  const [currentTime, setCurrentTime] = useState({});

  const navigate = useNavigate();

  const handleClicked = () => {
    navigate("/products/specialpage");
  };

  useEffect(() => {
    if (expired && !time) {
      const intervalClock = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString("fa-IR");
        const dateString = now.toLocaleDateString("fa-IR");
        setCurrentTime({ time: timeString, day: dateString });
      }, 1000);

      return () => clearInterval(intervalClock);
    }
  }, [time, expired]);

  useEffect(() => {
    const targetDate = new Date("2025-08-10T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({});
        setExpired(true);
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

  useEffect(() => {
    const targetDay = new Date("2025-08-10T00:00:00").getTime();

    const intervalDay = setInterval(() => {
      const now = new Date().getTime();
      const midd = targetDay - now;

      if (midd < 0) {
        clearInterval(intervalDay);
        setTime(null);
      } else {
        const day = Math.floor(midd / (1000 * 60 * 60 * 24));
        const hour = Math.floor(
          (midd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setTime({ day, hour });
      }
    }, 1000);
    return () => clearInterval(intervalDay);
  }, []);

  return (
    <div className="sale-container">
      <div className="special">
        <img src={womenClothe} alt="" className="image" />

        {!expired ? (
          <div className="countdown">
            <div className="header-paragraph">
              {" "}
              <h3>منتظر فروش استثنایی باشید</h3>
              <p>روز شمار فروش</p>
            </div>
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
          <>
            {time ? (
              <div className="expired">
                <p className="p-expired">
                  فروش ویژه آغاز شد
                  <span style={{ fontSize: "2rem" }}>{time.day}</span>روز و
                  <span style={{ fontSize: "2rem" }}>{time.hour}</span>ساعت
                  مانده تا اتمام
                </p>
                <button className="btn-expired" onClick={handleClicked}>
                  کلیک کنید
                </button>
              </div>
            ) : (
              <div>
                {!time && expired && (
                  <div className="currenttime">
                    <p className="p1">فروش ویژه تمام شد</p>
                    <p className="p2">
                      امروز<span>{currentTime.day}</span>و ساعت
                      <span>{currentTime.time}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SpecialSale;
