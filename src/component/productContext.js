import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [deliveryDateInput, setDeliveryDateInput] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [totalItems, setTotalItems] = useState(() => {
    const saved = localStorage.getItem("orders");
    const orders = saved ? JSON.parse(saved) : [];
    const total = orders.reduce((orderAcc, order) => {
      return (
        orderAcc +
        order.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0)
      );
    }, 0);
    return total;
  });

  useEffect(() => {
    const saved = localStorage.getItem("orders");
    const storedOrders = saved ? JSON.parse(saved) : [];

    const pastOrderItems = storedOrders.reduce(
      (acc, order) =>
        acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
      0
    );

    const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    setTotalItems(pastOrderItems + cartItems);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ذخیره cart در localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ذخیره user در localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // گرفتن محصولات و افزودن تخفیف موقتی
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const now = new Date();
      const oneWeekLater = new Date(now);
      oneWeekLater.setDate(now.getDate() + 7);

      const dollarRate = 50000; // نرخ دلار به تومان
      const updated = res.data.map((p) => {
        const tomanPrice = p.price * dollarRate;

        if (tomanPrice > 30000) {
          return {
            ...p,
            originalPrice: p.price,
            discount: 20, // درصد تخفیف
            discountEnd: oneWeekLater.toISOString(),
          };
        } else {
          return {
            ...p,
            discount: 0,
            discountEnd: null,
          };
        }
      });

      setProducts(updated);
    });
  }, []);

  const login = (username, password) => {
    const isAdmin = username === "tara" && password === "81726354";
    if (username && password) {
      const userData = { username, isAdmin };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addProduct = (newProduct) => {
    const item = { ...newProduct, id: Date.now() };
    setProducts((prev) => [...prev, item]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (updateProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updateProduct.id ? updateProduct : p))
    );
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const priceToUse = getDiscountedPrice(product); // بررسی تخفیف فعال
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, price: priceToUse }];
      }
    });
  };

  const removeToCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    alert("این محصول از سبد خرید حذف شد");
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // ✅ تابع محاسبه قیمت با تخفیف در صورت فعال بودن
  const getDiscountedPrice = (product) => {
    if (
      product.discount &&
      product.discount > 0 &&
      product.discountEnd &&
      new Date(product.discountEnd) > new Date()
    ) {
      return product.originalPrice * (1 - product.discount / 100);
    }
    return product.originalPrice || product.price;
  };

  const placeOrder = () => {
    if (!deliveryDateInput && !deliveryTime) {
      alert("لطفا تاریخ وبازه هزمانی تحویل محصول  رو وارد کنید");
      return;
    }

    const now = new Date();
    const deliveryDate = new Date(deliveryDateInput);

    const newOrder = {
      id: Date.now(),
      items: cart.map((item) => ({
        ...item,
        delivered: false,
      })),
      orderDate: now,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
    };
    setCart([]);
    setOrders((prev) => [...prev, newOrder]);
    return true;
  };

  return (
    <ProductContext.Provider
      value={{
        user,
        login,
        logout,
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        addToCart,
        removeToCart,
        clearCart,
        updateCartQuantity,
        cart,
        getTotalPrice,
        getDiscountedPrice,
        placeOrder,
        orders,
        setOrders,
        deliveryDateInput,
        setDeliveryDateInput,
        deliveryTime,
        setDeliveryTime,
        totalItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
