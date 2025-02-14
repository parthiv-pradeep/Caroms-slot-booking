import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import slotRoutes from './routes/slotRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware

app.use(
  cors({
    origin: ["https://caroms-slot-booking-frontend.onrender.com", "http://localhost:5173"], // Add localhost
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/caroms-slot-booking";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase connection timeout to 30 seconds
  socketTimeoutMS: 45000,  // Increase socket timeout to 45 seconds
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