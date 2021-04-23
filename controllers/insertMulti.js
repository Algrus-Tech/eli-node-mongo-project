const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

exports.insertMultiIntoTable = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });

  console.log(req.params.tableName);

  if (!table) {
    return next(new ErrorResponse("Table does not exist", 404));
  }

  const createdTable = await Table.create({ tableName: req.params.tableName });

  const modelName = req.params.tableName;

  const NewSchema = new Mongoose.Schema({}, { strict: false });

  NewTable = Mongoose.model(modelName, NewSchema);

  if (!req.body.length) {
    return next(
      new ErrorResponse("Please send an array of objects to insert", 401)
    );
  }

  let completeData = [];

  await req.body.forEach(async (ele) => {
    newData = await NewTable.create({
      ...ele,
    });
    console.log(newData);
    completeData.push(newData);
  });

  res.status(200).json({
    success: true,
  });
});
