const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableSchema = new Schema({
  tableName: { type: String },
});

module.exports = mongoose.model("Table", TableSchema);
