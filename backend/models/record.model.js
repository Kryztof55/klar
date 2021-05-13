const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    mail: { type: String, required: true },
    birthday: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
