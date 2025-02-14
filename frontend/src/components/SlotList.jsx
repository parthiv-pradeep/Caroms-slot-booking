import styles from "./SlotList.module.css";

function SlotList({ slots, finishSlot }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.slotList}>
      <h2>Booked Slots</h2>
      {slots.length === 0 ? (
        <p>No slots booked yet.</p>
      ) : (
        <ul>
          {slots.map((slot) => {
            console.log("Slot ID:", slot._id); // Debugging: Check slot._id
            return (
              <li key={slot._id}>
                <span>
                  {formatDate(slot.startTime)} - {formatDate(slot.endTime)}
                  <ul>
                    {slot.players.map((player, index) => {
                      // Improved player key handling
                      const playerKey = player._id ? player._id : `player-${index}`; // Use player._id if available, otherwise generate a unique string key

                      return (
                        <li key={playerKey}>{player.name}</li>
                      );
                    })}
                  </ul>
                </span>
                <button onClick={() => finishSlot(slot._id)}>Finish</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SlotList;