const mongoose = require('mongoose');

const LecturaSchema = new mongoose.Schema({
  dispositivo: { type: String, required: true }, // "MATHIAS" o "JEREMY"
  ph: Number,
  turbidez: Number,
  nivel: Number,
  lluvia: String,
  TextMetrics: Number,
  humedad: Number, // Para el proyecto de Jeremy
  bomba: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lectura', LecturaSchema);