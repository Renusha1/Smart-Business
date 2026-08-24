import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${API}/orders/${user.id}`)

      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <h3>{order.product_name}</h3>

          <p>
            Quantity:
            {order.quantity}
          </p>

          <p>Total: Rs.{order.total_price}</p>

          <p>
            Status:
            {order.status}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Orders;
