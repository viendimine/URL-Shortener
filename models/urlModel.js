const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  customAlias: { type: String, unique: true, sparse: true },
  visitCount: { type: Number, default: 0 },
  expiry: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("URL", urlSchema);
