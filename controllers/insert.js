const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");

exports.insertOneIntoTable = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });

  console.log(req.params.tableName);

  if (!table) {
    return next(new ErrorResponse("Table does not exist", 404));
  }
});
