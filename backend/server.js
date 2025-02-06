import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import slotRoutes from './routes/slotRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({ origin: 'https://caroms-slot-booking-frontend.onrender.com' })); // Enable CORS for all routes
app.use(express.json());

// MongoDB Connection

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.2ttr1.mongodb.net/carroms?retryWrites=true&w=majority&appName=Cluster0";
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