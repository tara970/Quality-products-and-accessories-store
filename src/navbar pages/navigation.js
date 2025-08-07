import React from "react";
import { Link, useLocation } from "react-router-dom";
import menClothes from "../images/men-clothes.jpg";
import womenClothes from "../images/women-clothes.jpg";
import jewelery from "../images/accessory.jpg";
import electronics from "../images/electronics.jpg";
import "../style/navigation.css";

function Navigation() {
  const location = useLocation();

  if (location.pathname !== "/products") return null;

  return (
    <div className="wave-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="top"
      >
        <path
          fill="#2b1700"
          fill-opacity="1"
          d="M0,128L80,149.3C160,171,320,213,480,213.3C640,213,800,171,960,144C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <div className="daste">
        <h3>دسته بندی ها</h3>
      </div>
      <nav className="nav">
        <Link to="/products/category/men's clothing">
          <img src={menClothes} alt="Men" />
          <span>Men-clothing</span>
        </Link>
        <Link to="/products/category/women's clothing">
          <img src={womenClothes} alt="Women" />
          <span>Women-clothing</span>
        </Link>
        <Link to="/products/category/jewelery">
          <img src={jewelery} alt="Jewelery" />
          <span>Jewelery</span>
        </Link>
        <Link to="/products/category/electronics">
          <img src={electronics} alt="Electronics" />
          <span>Electronics</span>
        </Link>
      </nav>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="bottom"
      >
        <path
          fill="#2b1700"
          fill-opacity="1"
          d="M0,128L80,133.3C160,139,320,149,480,149.3C640,149,800,139,960,144C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

export default Navigation;
