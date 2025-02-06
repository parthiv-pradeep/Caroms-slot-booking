import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import slotRoutes from './routes/slotRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;




// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/carrom_booking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/slots", slotRoutes);

// Test Route (optional)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});