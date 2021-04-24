const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

exports.removeDocById = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });

  console.log(req.params.tableName);

  if (!table) {
    return next(new ErrorResponse("Table does not exist", 404));
  }

  let found = 0;
  for (let i = 0; i < pastQueries.length; i++) {
    if (pastQueries[i] === req.params.tableName) {
      found = 1;
      let currModel = ModelArray[i];
      await currModel.findByIdAndDelete(req.params.docId);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(204).json({
        success: true,
      });
    }
  }

  if (found === 0) {
    const modelName = req.params.tableName;

    const NewSchema = new Mongoose.Schema({}, { strict: false });

    NewTable = Mongoose.model(modelName, NewSchema);

    await NewTable.findByIdAndDelete(req.params.docId);

    pastQueries.push(req.params.tableName);
    ModelArray.push(NewTable);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(204).json({
      success: true,
    });
  }
});
