import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);
  }, []);

  // Update Cart Storage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase Quantity
  const increaseQty = (index) => {
    const updated = [...cart];

    updated[index].quantity = (updated[index].quantity || 1) + 1;

    updateCart(updated);
  };

  // Decrease Quantity
  const decreaseQty = (index) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity--;
    }

    updateCart(updated);
  };

  // Remove Product
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);

    updateCart(updated);
  };

  // Clear Cart

  const clearCart = () => {
    localStorage.removeItem("cart");

    setCart([]);
  };

  // Total Price

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  // Checkout

  const checkout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(cart));

    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>🛒 My Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>

          <p>Add products to continue shopping.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-card" key={index}>
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.name}
                />

                <div className="cart-info">
                  <h2>{item.name}</h2>

                  <p>
                    Category:
                    {item.category}
                  </p>

                  <h3>Rs. {item.price}</h3>

                  <div className="quantity">
                    <button onClick={() => decreaseQty(index)}>-</button>

                    <span>{item.quantity || 1}</span>

                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>
                </div>

                <div className="cart-actions">
                  <button
                    className="buy-btn"
                    onClick={() => {
                      localStorage.setItem("buyProduct", JSON.stringify(item));

                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </button>

                  <button className="remove" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>
              Total Items:
              {cart.length}
            </h2>

            <h2>Total Price: Rs. {totalPrice}</h2>

            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>

            <button className="checkout-btn" onClick={checkout}>
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
