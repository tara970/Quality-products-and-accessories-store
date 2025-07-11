import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./component/productContext";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import ProductsLayout from "./productsLayout";
import SearchProduct from "./pages/searchProduct"; // 👈 ما همه صفحات مربوط به محصولات رو اینجا می‌ذاریم
import SelectedProduct from "./component into pages/selectedProduct";
import Selected from "./component into pages/selected";
import MySelect from "./navbar pages/my-select";
import CartShope from "./pages/cartshope";
import PrivateRoute from "./component/privateroute";

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="search/:query" element={<SearchProduct />} />
          <Route path="product/:id" element={<SelectedProduct />} />
          <Route path="product/category/:id" element={<Selected />} />
          <Route path="all-products/:id" element={<MySelect />} />

          <Route
            path="/cartshope"
            element={
              <PrivateRoute>
                <CartShope />
              </PrivateRoute>
            }
          />
          {/* همه‌ی صفحات products زیر این layout هستند */}
          <Route path="/products/*" element={<ProductsLayout />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
