const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamp");

// @desc       Get all bootcamps
// @route      Get /api/v1/bootcamps
// @access     Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamps.find();

  res
    .status(200)
    .json({ status: "success", count: bootcamps.length, data: bootcamps });
});

// @desc       Get single bootcamp
// @route      GET /api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = asyncHandler(async (req, res, next)  => {
  const bootcamp = await Bootcamps.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ status: "success", data: bootcamp });
});

// @desc       Create new bootcamp
// @route      POST /api/v1/bootcamps
// @access     Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.create(req.body);

  res.status(200).json({
    status: "success",
    data: bootcamp,
  });
});

// @desc       Update single bootcamp
// @route      PUT /api/v1/bootcamps/:id
// @access     Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success", data: bootcamp });
});

// @desc       Delete single bootcamp
// @route      DELETE /api/v1/bootcamps/:id
// @access     Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ status: "success", data: {} });
});
