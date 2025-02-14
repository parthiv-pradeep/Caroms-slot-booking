import styles from "./CarromBoard.module.css"

function CarromBoard() {
  return (
    <div className={styles.carromBoard}>
      <div className={styles.corner}></div>
      <div className={styles.corner}></div>
      <div className={styles.corner}></div>
      <div className={styles.corner}></div>
      <div className={styles.center}></div>
    </div>
  )
}

export default CarromBoard

