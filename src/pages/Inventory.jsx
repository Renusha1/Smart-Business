import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Inventory.css";

function Inventory() {
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
  });

  // Get Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/products", product);

      alert("Product Added Successfully");

      setProduct({
        name: "",
        category: "",
        quantity: "",
        price: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert("Unable to add product");
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>

      <div className="inventory-form">
        <h2>Add Product</h2>

        <form onSubmit={addProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />

          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="product-table">
        <h2>Available Stock</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.quantity}</td>

                <td>Rs. {item.price}</td>

                <td>
                  {item.quantity > 10 ? (
                    <span className="available">Available</span>
                  ) : (
                    <span className="low">Low Stock</span>
                  )}
                </td>

                <td>
                  <button
                    className="delete"
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
