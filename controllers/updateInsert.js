const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

exports.updateAndInsertDoc = asyncHandler(async (req, res, next) => {
  let table = await Table.findOne({ tableName: req.params.tableName });

  console.log(req.params.tableName);

  if (!table) {
    return next(new ErrorResponse("Table does not exist", 404));
  }

  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log(queryStr);

  let found = 0;
  for (let i = 0; i < pastQueries.length; i++) {
    if (pastQueries[i] === req.params.tableName) {
      found = 1;
      let currModel = ModelArray[i];

      foundOrNot = await currModel.find(JSON.parse(queryStr));
      if (foundOrNot.length !== 0) {
        console.log("here");
        console.log(foundOrNot);
        newData = await currModel.findOneAndUpdate(
          JSON.parse(queryStr),
          req.body
        );
        res.status(200).json({
          success: true,
        });
      } else {
        newData = await currModel.create({
          ...req.body,
        });
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).json({
          success: true,
          data: newData,
        });
      }
    }
  }

  if (found === 0) {
    const modelName = req.params.tableName;

    const NewSchema = new Mongoose.Schema({}, { strict: false });

    NewTable = Mongoose.model(modelName, NewSchema);

    foundOrNot = await NewTable.find(JSON.parse(queryStr));
    if (foundOrNot.length !== 0) {
      newData = await NewTable.findOneAndUpdate(JSON.parse(queryStr), req.body);

      pastQueries.push(req.params.tableName);
      ModelArray.push(NewTable);

      res.status(200).json({
        success: true,
      });
    } else {
      newData = await NewTable.create({
        ...req.body,
      });

      pastQueries.push(req.params.tableName);
      ModelArray.push(NewTable);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(200).json({
        success: true,
        data: newData,
      });
    }
  }
});
