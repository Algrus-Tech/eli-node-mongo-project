const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Mongoose = require("mongoose");
const Table = require("../models/Table");

exports.fetchData = asyncHandler(async (req, res, next) => {
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
  console.log(JSON.parse(queryStr));

  let conv_obj = JSON.parse(queryStr);

  for (const key in conv_obj) {
    if (conv_obj[key].startsWith("/")) {
      conv_obj[key] = {
        $regex: conv_obj[key].split("/")[1],
      };
    }
  }

  console.log(conv_obj);

  let found = 0;
  for (let i = 0; i < pastQueries.length; i++) {
    if (pastQueries[i] === req.params.tableName) {
      found = 1;
      let currModel = ModelArray[i];

      query = currModel.find(conv_obj);
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      }

      if (req.query.limit) {
        query = query.limit(+req.query.limit);
      }

      newData = await query;

      res.status(200).json({
        success: true,
        data: newData,
      });
    }
  }

  if (found === 0) {
    const modelName = req.params.tableName;

    const NewSchema = new Mongoose.Schema({}, { strict: false });

    NewTable = Mongoose.model(modelName, NewSchema);

    query = NewTable.find(conv_obj);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    if (req.query.limit) {
      console.log(req.query.limit);
      query = query.limit(+req.query.limit);
    }
    newData = await query;
    pastQueries.push(req.params.tableName);
    ModelArray.push(NewTable);

    res.status(200).json({
      success: true,
      data: newData,
    });
  }
});
