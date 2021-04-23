const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

exports.createTable = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });
  console.log(table);
  console.log(req.params.tableName);

  if (table) {
    return next(new ErrorResponse("Table already exists", 401));
  }

  const createdTable = await Table.create({ tableName: req.params.tableName });

  const modelName = req.params.tableName;

  const NewSchema = new Mongoose.Schema({}, { strict: false });

  NewTable = Mongoose.model(modelName, NewSchema);

  await NewTable.create({
    name: "sample name",
    age: 10,
  });

  res.status(200).json({
    success: true,
    data: createdTable,
  });
});
