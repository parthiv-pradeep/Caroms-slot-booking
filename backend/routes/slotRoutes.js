import express from 'express';
import Slot from '../models/Slot.js'; // Make sure this import is also correct!

const router = express.Router();

// Get all slots
router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find();
    console.log("Fetched slots from DB:", slots);
    res.json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: err.message });
  }
});

// Book a slot
router.post("/", async (req, res) => {
    try {
      const { startTime, endTime, players } = req.body;
  
      if (!startTime || !endTime || !players || !Array.isArray(players) || players.length === 0) {
        return res.status(400).json({ message: "Missing required fields or invalid players array" });
      }
  
      // Check how many players are already booked at this time
      const existingSlot = await Slot.findOne({ startTime });
  
      if (existingSlot) {
        if (existingSlot.players.length >= 4) {
          return res.status(400).json({ message: "This slot is already full (4 players max)" });
        }
  
        // Append the new player to the existing slot
        existingSlot.players.push({ name: players[0].name });
  
        if (existingSlot.players.length > 4) {
          return res.status(400).json({ message: "Slot is full, cannot add more players" });
        }
  
        await existingSlot.save();
        console.log("Updated slot with new player:", existingSlot);
        return res.status(200).json(existingSlot);
      }
  
      // If no existing slot, create a new one
      const newSlot = new Slot({
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        players: players.map(player => ({ name: player.name })),
      });
  
      const savedSlot = await newSlot.save();
      console.log("Created new slot:", savedSlot);
      res.status(201).json(savedSlot);
  
    } catch (err) {
      console.error("Error booking slot:", err);
      res.status(400).json({ message: err.message });
    }
  });

// DELETE a slot by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete slot with ID: ${id}`);

    const deletedSlot = await Slot.findByIdAndDelete(id);

    if (!deletedSlot) {
      console.log(`Slot with ID ${id} not found`);
      return res.status(404).json({ message: 'Slot not found' });
    }

    console.log(`Deleted slot: ${deletedSlot}`);
    res.json({ message: 'Slot deleted' });  // Or res.status(204).send();
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
