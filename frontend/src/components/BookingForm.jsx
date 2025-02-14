import { useState } from "react"
import styles from "./BookingForm.module.css"

function BookingForm({ addSlot }) {
  const [name, setName] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit function called!");
  
    if (name && time) {
      const startTime = new Date(time);
      const endTime = new Date(startTime.getTime() + 10 * 60 * 1000); // End time is 10 minutes after startTime
  
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        console.error("Invalid date/time");
        return;
      }
  
      const newSlot = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        players: [{ name }], // Wrap name inside an array
      };
  
      addSlot(newSlot); // Send formatted data to the API
      setName("");
      setTime("");
    }
  };
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Book a Slot</h2>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="time">Time:</label>
        <input type="datetime-local" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <button type="submit">Book Slot</button>
    </form>
  )
}

export default BookingForm

