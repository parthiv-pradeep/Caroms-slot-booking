import { useState, useEffect } from "react"
import Header from "./components/Header"
import BookingForm from "./components/BookingForm"
import SlotList from "./components/SlotList"
import CarromBoard from "./components/CarromBoard"
import styles from "./App.module.css"


const API_URL = process.env.REACT_APP_BACKEND_URL||'https://caroms-slot-booking.onrender.com';
fetch(`${API_URL}/api/slots`)

function App() {
  const [slots, setSlots] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/slots")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Fetched slots:", data)
      setSlots(data)
    } catch (error) {
      console.error("Error fetching slots:", error)
      setError("Failed to fetch slots. Please try again later.")
    }
  }

  const addSlot = async (newSlot) => {
    console.log("Data being sent to create a new slot:", newSlot);
    try {
      const response = await fetch("http://localhost:5000/api/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSlot),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Added new slot:", data)
      // Instead of fetchSlots, update the state directly for better performance
      setSlots(prevSlots => [...prevSlots, data]);
    } catch (error) {
      console.error("Error adding slot:", error)
      setError(`Failed to add slot: ${error.message}`)
    }
  }

  const finishSlot = async (id) => {
 try {
   const response = await fetch(`http://localhost:5000/api/slots/${id}`, {  // Use backticks for template literal
     method: "DELETE",
   })
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`)
   }
   console.log("Finished slot:", id)
   // Instead of fetchSlots, update the state directly for better performance
   setSlots(prevSlots => prevSlots.filter(slot => slot._id !== id)); // Assuming your slot object has an '_id' property. If it's 'id', change accordingly.
 } catch (error) {
   console.error("Error finishing slot:", error)
   setError("Failed to finish slot. Please try again later.")
 }
}

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