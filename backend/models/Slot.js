// models/Slot.js (ES Modules)
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  players: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Slot = mongoose.model('Slot', slotSchema);

export default Slot; // This is the crucial line! Export Slot as the default export