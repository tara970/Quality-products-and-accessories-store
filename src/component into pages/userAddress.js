import React, { useContext, useState } from "react";
import "../style/useraddress.css";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../component/productContext";
import melat from "../images/melat.png";
import pasargad from "../images/pasargd.jpg";

function UserAddress() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalcode: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (
      !formData.fullname ||
      !formData.phone ||
      !formData.province ||
      !formData.city ||
      !formData.address
    ) {
      alert("لطفا تمام فیلد هارو پر کنید");
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const { placeOrder } = useContext(ProductContext);
  //البته این دستور success برای زمانی باید اجرا بشه که من پرداختم رو تنجتم دادم//
  const handlePayment = (gateway) => {
    const success = placeOrder();
    console.log(gateway);

    if (success) {
      alert(`درحال انتقال به درگاه پرداخت: ${gateway}`);

      setTimeout(() => {
        navigate("/cartshope/orders");
      }, 2000);
    } else {
      alert("مشکلی در ثبت سفارش پیش آمده.");
    }
  };

  const cities = [
    "تهران",
    "مشهد",
    "اصفهان",
    "کاشان",
    "بندر عباس",
    "گرگان",
    "گیلان",
    "مازندران",
    "قم",
    "قزوین",
    "کردستان",
    "سیستان",
    "شیراز",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="useraddress">
      <form className="address-form">
        <input
          type="text"
          name="fullname"
          placeholder="نام و نام خانوادگی"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="شماره موبایل"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="province"
          placeholder="استان"
          onChange={handleChange}
          required
        />
        <div className="input-select">
          <input
            type="text"
            name="city"
            placeholder="شهر"
            onChange={handleChange}
            value={formData.city}
            required
          />
          <select
            name="city"
            onChange={handleChange}
            value={formData.city}
            required
          >
            <option>انتخاب شهر</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <textarea
          name="address"
          placeholder="آدرس دقیق"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="postalcode"
          placeholder="کد پستی"
          onChange={handleChange}
        />
        <button type="button" onClick={handleOpenModal}>
          پرداخت
        </button>
      </form>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>انتخاب درگاه پرداخت</h3>
            <ul className="gateway-list">
              <li onClick={() => handlePayment("ملت")}>
                <img src={melat} alt="" className="img" />
              </li>
              <li onClick={() => handlePayment("پاسارگاد")}>
                <img src={pasargad} alt="" className="img" />
              </li>
            </ul>
            <button onClick={handleCloseModal}>بستن</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAddress;
