const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// ================= DATABASE =================

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "smart_business_system",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database Connection Error");
    console.log(err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

// ================= REGISTER =================

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",

    [email],

    async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",

        [name, email, hash, role || "user"],

        (err) => {
          if (err) {
            return res.status(500).json({
              message: "User insert error",
            });
          }

          res.status(201).json({
            message: "Registration Successful",
          });
        },
      );
    },
  );
});

// ================= LOGIN =================

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",

    [email],

    async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({
          message: "Wrong password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },

        "smartbusinesssecret",

        {
          expiresIn: "1d",
        },
      );

      res.json({
        message: "Login Successful",

        token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    },
  );
});

// ================= USERS =================

// GET USERS

app.get("/users", (req, res) => {
  db.query(
    "SELECT id,name,email,role FROM users ORDER BY id DESC",

    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.json(result);
    },
  );
});

// UPDATE USER

app.put("/users/:id", (req, res) => {
  const id = req.params.id;

  const { name, email, role } = req.body;

  db.query(
    "UPDATE users SET name=?,email=?,role=? WHERE id=?",

    [name, email, role, id],

    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Update error",
        });
      }

      res.json({
        message: "User Updated Successfully",
      });
    },
  );
});

// DELETE USER

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM users WHERE id=?",

    [id],

    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Delete error",
        });
      }

      res.json({
        message: "User Deleted Successfully",
      });
    },
  );
});

// =================================================
//                    PRODUCTS
// =================================================

// GET ALL PRODUCTS

app.get("/products", (req, res) => {
  db.query(
    "SELECT * FROM products ORDER BY id DESC",

    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.json(result);
    },
  );
});

// ADD PRODUCT

app.post("/products", (req, res) => {
  const { name, category, price, stock } = req.body;

  console.log("Received Product:", req.body);

  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  db.query(
    `
INSERT INTO products
(name,category,price,stock)
VALUES(?,?,?,?)
`,

    [name, category, Number(price), Number(stock)],

    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Database insert error",

          error: err,
        });
      }

      res.status(201).json({
        message: "Product Added Successfully",
      });
    },
  );
});

// UPDATE PRODUCT

app.put("/products/:id", (req, res) => {
  const id = req.params.id;

  const { name, category, price, stock } = req.body;

  db.query(
    `
UPDATE products

SET name=?,
category=?,
price=?,
stock=?

WHERE id=?

`,

    [name, category, Number(price), Number(stock), id],

    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Update error",
        });
      }

      res.json({
        message: "Product Updated Successfully",
      });
    },
  );
});

// DELETE PRODUCT

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM products WHERE id=?",

    [id],

    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Delete error",
        });
      }

      res.json({
        message: "Product Deleted Successfully",
      });
    },
  );
});
// ================= ORDERS =================

// Create Order

app.post("/orders", (req, res) => {
  const { user_id, product_id, product_name, quantity, price } = req.body;

  const total_price = Number(price) * Number(quantity);

  const sql = `

INSERT INTO orders

(user_id,product_id,product_name,quantity,price,total_price)

VALUES(?,?,?,?,?,?)

`;

  db.query(
    sql,

    [user_id, product_id, product_name, quantity, price, total_price],

    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Order Failed",
        });
      }

      res.json({
        message: "Order placed successfully",

        order_id: result.insertId,
      });
    },
  );
});

// Get User Orders

app.get("/orders/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM orders WHERE user_id=? ORDER BY id DESC";

  db.query(
    sql,
    [userId],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
});

// ================= SERVER =================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
