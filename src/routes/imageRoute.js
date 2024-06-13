
const express = require("express");
const routes = express.Router();
const ImageUploadController = require("../controller/ImageUploadController")



routes.post("/uploadImage", ImageUploadController.uploadImage)
routes.post("/makePdf", ImageUploadController.makePdf)
module.exports = routes