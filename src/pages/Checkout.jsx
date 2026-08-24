import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Checkout() {
  const navigate = useNavigate();

  const product = JSON.parse(localStorage.getItem("buyProduct"));

  const user = JSON.parse(localStorage.getItem("user"));

  const [quantity, setQuantity] = useState(1);

  const confirmOrder = async () => {
    try {
      await axios.post(`${API}/orders`, {
        user_id: user.id,

        product_id: product.id,

        product_name: product.name,

        quantity: quantity,

        price: product.price,
      });

      alert("Order placed successfully");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert("Order failed");
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <h2>{product.name}</h2>

      <p>Price: Rs. {product.price}</p>

      <label>Quantity</label>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <h3>Total Amount: Rs. {product.price * quantity}</h3>

      <button onClick={confirmOrder}>Confirm Order</button>

      <button>Pay with eSewa</button>
    </div>
  );
}

export default Checkout;
