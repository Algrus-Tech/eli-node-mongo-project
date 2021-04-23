const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

exports.insertOneIntoTable = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });

  console.log(req.params.tableName);

  if (!table) {
    return next(new ErrorResponse("Table does not exist", 404));
  }

  const createdTable = await Table.create({ tableName: req.params.tableName });

  const modelName = req.params.tableName;

  const NewSchema = new Mongoose.Schema({}, { strict: false });

  NewTable = Mongoose.model(modelName, NewSchema);

  newData = await NewTable.create({
    ...req.body,
  });

  res.status(200).json({
    success: true,
    data: newData,
  });
});
