import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Products.css";
const API = "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ============================
  // Fetch Products
  // ============================

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);

      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // Input Change
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // Validation
  // ============================

  const validate = () => {
    if (
      form.name === "" ||
      form.category === "" ||
      form.price === "" ||
      form.stock === ""
    ) {
      alert("Please fill all fields");
      return false;
    }

    if (Number(form.price) <= 0) {
      alert("Invalid Price");
      return false;
    }

    if (Number(form.stock) < 0) {
      alert("Invalid Stock");
      return false;
    }

    return true;
  };

  // ============================
  // Add Product
  // ============================

  const addProduct = async () => {
    if (!validate()) return;

    try {
      await axios.post(`${API}/products`, form);

      alert("Product Added Successfully");

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);

      alert("Unable to add product");
    }
  };

  // ============================
  // Delete Product
  // ============================

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/products/${id}`);

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // Edit Product
  // ============================

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
  };

  // ============================
  // Update Product
  // ============================

  const updateProduct = async () => {
    if (!validate()) return;

    try {
      await axios.put(`${API}/products/${editingId}`, form);

      alert("Product Updated");

      setEditingId(null);

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // Linear Search Algorithm
  // ============================

  const linearSearch = (keyword) => {
    let result = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      if (
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.category.toLowerCase().includes(keyword.toLowerCase())
      ) {
        result.push(product);
      }
    }

    setFilteredProducts(result);
  };

  // ============================
  // Search
  // ============================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value === "") {
      setFilteredProducts(products);
    } else {
      linearSearch(value);
    }
  };

  // ============================
  // Statistics
  // ============================

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.stock),
    0,
  );

  const totalValue = products.reduce(
    (sum, item) => sum + Number(item.stock) * Number(item.price),
    0,
  );

  return (
    <div className="products-container">
      <h1>Products Management</h1>

      <div className="stats">
        <div className="card">
          <h2>{totalProducts}</h2>
          <p>Total Products</p>
        </div>

        <div className="card">
          <h2>{totalStock}</h2>
          <p>Total Stock</p>
        </div>

        <div className="card">
          <h2>Rs. {totalValue}</h2>
          <p>Total Value</p>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          min="0"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => {
            if (Number(e.target.value) >= 0 || e.target.value === "") {
              handleChange(e);
            }
          }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        {editingId ? (
          <button onClick={updateProduct}>Update Product</button>
        ) : (
          <button onClick={addProduct}>Add Product</button>
        )}
      </div>

      {/* Part 2 starts with the Product Table */}
      {/* Product Table */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>

                  <td>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>Rs. {product.price}</td>

                  <td>{product.stock}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
