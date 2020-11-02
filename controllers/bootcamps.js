const ErrorResponse = require('../utils/errorResponse');
const Bootcamps = require("../models/Bootcamp");

// @desc       Get all bootcamps
// @route      Get /api/v1/bootcamps
// @access     Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamps.find();

    res.status(200).json({ status: "success", data: bootcamps });
  } catch (err) {
    res.status(400).json({ status: "failed", msg: err.message });
  }
};

// @desc       Get single bootcamp
// @route      GET /api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findById(req.params.id);

    res.status(200).json({ status: "success", data: bootcamp });
  } catch (err) {
    next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`)
  }
};

// @desc       Create new bootcamp
// @route      POST /api/v1/bootcamps
// @access     Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.create(req.body);

    res.status(200).json({
      status: "success",
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      msg: err.message,
    });
  }
};

// @desc       Update single bootcamp
// @route      PUT /api/v1/bootcamps/:id
// @access     Public
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "success", data: bootcamp });
  } catch (err) {
    res.status(400).json({ status: "failed", msg: err.message });
  }
};

// @desc       Delete single bootcamp
// @route      DELETE /api/v1/bootcamps/:id
// @access     Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ status: "success", data: {} });
  } catch (err) {
    res.status(400).json({ status: "failed", msg: err.message });
  }
};
