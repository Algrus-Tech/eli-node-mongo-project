const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

let ModelArray = [];
let pastQueries = [];

exports.insertMultiIntoTable = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });

  console.log(req.params.tableName);

  if (!table) {
    return next(new ErrorResponse("Table does not exist", 404));
  }

  if (!req.body.length) {
    return next(
      new ErrorResponse("Please send an array of objects to insert", 401)
    );
  }

  let found = 0;
  for (let i = 0; i < pastQueries.length; i++) {
    if (pastQueries[i] === req.params.tableName) {
      found = 1;
      let currModel = ModelArray[i];
      let completeData = [];

      await req.body.forEach(async (ele) => {
        newData = await currModel.create({
          ...ele,
        });
        console.log(newData);
        completeData.push(newData);
      });

      res.status(200).json({
        success: true,
      });
    }
  }

  if (found === 0) {
    const modelName = req.params.tableName;

    const NewSchema = new Mongoose.Schema({}, { strict: false });

    NewTable = Mongoose.model(modelName, NewSchema);

    let completeData = [];

    await req.body.forEach(async (ele) => {
      newData = await NewTable.create({
        ...ele,
      });
      console.log(newData);
      completeData.push(newData);
    });

    pastQueries.push(req.params.tableName);
    ModelArray.push(NewTable);

    res.status(200).json({
      success: true,
    });
  }
});
