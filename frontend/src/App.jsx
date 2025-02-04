import { useState } from "react"
import Header from "./components/Header"
import BookingForm from "./components/BookingForm"
import SlotList from "./components/SlotList"
import CarromBoard from "./components/CarromBoard"
import styles from "./App.module.css"

function App() {
  const [slots, setSlots] = useState([])

  const addSlot = (newSlot) => {
    setSlots([...slots, newSlot])
  }

  const finishSlot = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index)
    setSlots(updatedSlots)
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <BookingForm addSlot={addSlot} />
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

