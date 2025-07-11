import React, { useState, useContext } from "react";
import { ProductContext } from "../component/productContext";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Text from "../component into pages/text";
import "../style/products.css";
import clothesImage from "../images/clothes.jpg";
import BestSellerProduct from "../component into pages/bestSellerProduct";
import SpecialSale from "../component into pages/specialSale";

const Products = () => {
  const { products, addProduct, user } = useContext(ProductContext);
  console.log("user =", user);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredInputSearch, setFilteredInputSearch] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const handleShowInput = () => {
    setShowInput(true);
  };

  const filterdProducts = products.filter((p) => {
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    const matchSearchInput =
      !filteredInputSearch.trim() || p.title.toString().includes(filteredInputSearch);
    return matchCategory && matchSearchInput;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      category: cat,
      title: title,
      description: desc,
      price: price,
    };

    addProduct([...products, newProduct]);
    setCat("");
    setTitle("");
    setDesc("");
    setPrice("");
  };

  return (
    <div className="products-container">
      {/* 🔍 دکمه سرچ */}
      <div className="btnSearch">
        <button onClick={handleShowInput} className="btn">
          <SearchIcon />
        </button>
        {showInput && (
          <input
            className="input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchInput.trim()) {
                e.preventDefault();
                navigate(`/search/${searchInput}`);
                setSearchInput("");
              }
            }}
          />
        )}
      </div>

      {/* 📝 متن و تصویر */}
      <div className="text">
        <Text />
      </div>

      <div className="image">
        <svg viewBox="0 0 200 200" width="980" height="600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="blobClip">
              <path
                d="M32,-52.4C38.6,-51.6,39,-37.2,41.3,-26.2C43.6,-15.2,47.8,-7.6,51,1.9C54.3,11.3,56.6,22.7,52,29.7C47.3,36.6,35.7,39.2,25.9,39.3C16.1,39.4,8,36.9,-2,40.4C-12,43.8,-24.1,53.2,-36.6,54.7C-49.1,56.2,-62.2,49.8,-60.4,39.4C-58.7,29,-42.1,14.5,-40.1,1.2C-38,-12.1,-50.5,-24.2,-51.1,-32.6C-51.7,-41.1,-40.5,-45.9,-30,-44.3C-19.5,-42.8,-9.8,-34.9,1.5,-37.5C12.7,-40.1,25.4,-53.1,32,-52.4Z"
                transform="translate(100 100)"
              />
            </clipPath>
          </defs>
          <image
            href={clothesImage}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#blobClip)"
          />
        </svg>
      </div>

      {/* 👤 فقط ادمین دکمه ببینه */}
      {user?.isAdmin && (
        <div>
          <button className="add-product-btn" onClick={() =>{ setModal(true); console.log("clicked");}}>
            + اضافه کردن محصول جدید
          </button>
        </div>
      )}

      {/* 💬 مودال فرم */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModal(false)}>
              ×
            </button>
            <h3 style={{ marginBottom: "1rem" }}>افزودن محصول</h3>
            <form
              onSubmit={(e) => {
                handleAddProduct(e);
                setModal(false);
              }}
              className="modal-form"
            >
              <input
                type="text"
                placeholder="دسته‌بندی"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
              <input
                type="text"
                placeholder="عنوان"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="توضیحات"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                type="text"
                placeholder="قیمت"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button type="submit" className="form-btn">ثبت محصول</button>
            </form>
          </div>
        </div>
      )}

      <div>
        <BestSellerProduct />
      </div>
      <div>
        <SpecialSale />
      </div>
    </div>
  );
};

export default Products;
