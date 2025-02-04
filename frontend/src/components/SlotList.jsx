import styles from "./SlotList.module.css"

function SlotList({ slots, finishSlot }) {
  return (
    <div className={styles.slotList}>
      <h2>Booked Slots</h2>
      {slots.length === 0 ? (
        <p>No slots booked yet.</p>
      ) : (
        <ul>
          {slots.map((slot, index) => (
            <li key={index}>
              <span>
                {slot.name} - {slot.time}
              </span>
              <button onClick={() => finishSlot(index)}>Finish</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SlotList

