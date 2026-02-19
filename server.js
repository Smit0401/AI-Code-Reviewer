const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  //console.log("Root route hit");
  res.send("Server is running 🚀"); 
});

const PORT = 5001;



const User = require("./models/User");

app.get("/create-test-user", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "123456"
  });

  res.json(user);
}); 

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});

const submissionRoutes = require("./routes/submissionRoutes");

app.use("/api/submissions", submissionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
