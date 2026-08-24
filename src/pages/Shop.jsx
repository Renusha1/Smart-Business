import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Shop.css";

const API = "http://localhost:5000";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart");
  };

  const buyNow = (product) => {
    localStorage.setItem("buyProduct", JSON.stringify(product));

    navigate("/checkout");
  };
  return (
    <div className="shop-container">
      <h1>Smart Business Store</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="no-image">No Image</div>
            )}

            <h2>{product.name}</h2>

            <p>Category: {product.category}</p>

            <h3>Rs. {product.price}</h3>

            <p>Stock: {product.stock}</p>

            <button onClick={() => addToCart(product)}>Add To Cart</button>

            <button className="buy-btn" onClick={() => buyNow(product)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
