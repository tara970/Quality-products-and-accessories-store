import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductContext } from "../component/productContext";

function Login({ onClose }) {
  const { login } = useContext(ProductContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password); // 👈 بررسی لاگین موفق
    console.log(success);
    
    if (success) {
      if (onClose) onClose(); // بستن مودال
      const redirectPath = searchParams.get("redirect") || "/products";
      navigate(redirectPath); // انتقال به صفحه مورد نظر
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
