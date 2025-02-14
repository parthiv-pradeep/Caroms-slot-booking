import { useState, useEffect } from "react"
import Header from "./components/Header"
import BookingForm from "./components/BookingForm"
import SlotList from "./components/SlotList"
import CarromBoard from "./components/CarromBoard"
import styles from "./App.module.css"


const API_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:5000"  // Change this to your local backend URL
  : "https://caroms-slot-booking-backend.onrender.com";
function App() {
  const [slots, setSlots] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchSlots();
}, []);


const fetchSlots = async () => {  // ✅ Move function above useEffect
    try {
        const response = await fetch(`${API_URL}/api/slots`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched slots:", data);
        setSlots(data);
    } catch (error) {
        console.error("Error fetching slots:", error);
        setError("Failed to fetch slots. Please try again later.");
    }
};


const addSlot = async (newSlot) => {
  console.log("Data being sent to create a new slot:", newSlot);
  try {
      const response = await fetch(`${API_URL}/api/slots`, {  
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newSlot),
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Added new slot:", data);
      setSlots(prevSlots => [...prevSlots, data]);
  } catch (error) {
      console.error("Error adding slot:", error);
      setError(`Failed to add slot: ${error.message}`);
  }
};

const finishSlot = async (id) => {
  try {
      const response = await fetch(`${API_URL}/api/slots/${id}`, {  // ✅ Use API_URL
          method: "DELETE",
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Finished slot:", id);
      setSlots(prevSlots => prevSlots.filter(slot => slot._id !== id));
  } catch (error) {
      console.error("Error finishing slot:", error);
      setError("Failed to finish slot. Please try again later.");
  }
};

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <BookingForm addSlot={addSlot} />
          {error && <p className={styles.error}>{error}</p>}
          <SlotList slots={slots} finishSlot={finishSlot} />
        </div>
        <div className={styles.rightColumn}>
          <CarromBoard />
        </div>
      </main>
    </div>
  )
}

export default App