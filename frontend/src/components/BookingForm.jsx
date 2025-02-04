import { useState } from "react"
import styles from "./BookingForm.module.css"

function BookingForm({ addSlot }) {
  const [name, setName] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && time) {
      addSlot({ name, time })
      setName("")
      setTime("")
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Book a Slot</h2>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="time">Time:</label>
        <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <button type="submit">Book Slot</button>
    </form>
  )
}

export default BookingForm

