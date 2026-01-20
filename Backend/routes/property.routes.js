import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/poperty.controller.js";

import { upload } from "../utils/cloudinary.js";

const cpUpload = upload.fields([
  { name: "images", maxCount: 5 },
  { name: "thumbnail", maxCount: 1 },
]);

const router = express.Router();

// Create a new property
router.post("/",cpUpload, createProperty);

// Get all properties
router.get("/", getAllProperties);

// Get a property by ID
router.get("/:id", getPropertyById);

// Update a property by ID
router.put("/:id", updateProperty);

router.delete("/:id", deleteProperty);

export default router;
