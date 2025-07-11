import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Login from "./login";
import "../style/home.css";

function Home() {
  const [searchParams] = useSearchParams();
  const [showLogin, setShowLogin] = useState(false);

  // باز کردن مودال لاگین اگر login=true در URL باشه
  useEffect(() => {
    if (searchParams.get("login") === "true") {
      setShowLogin(true);
    }
  }, [searchParams]);

  const handleClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="main-container">
      <div className="container">
        <h2 className="header">آهای قهرمان خرید! 😎</h2>
        <br />
        <p>قبل از اینکه وارد دنیای محصولات بشی، لطفاً لاگین کن!</p>
        <br />
        <p className="message">فقط یک کلیک تا ورود باقی مونده 👇</p>
      </div>
      <div>
        <button onClick={handleClick} className="btn1">click here</button> 
      </div>

      {showLogin && (
        <div className="modal-loyer">
          <div className="modal">
            <button className="close" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
