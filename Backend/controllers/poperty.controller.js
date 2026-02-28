import Property from "../models/property.model.js";
import User from "../models/user.model.js";
import verifyToken from "../middlewares/auth.middleware.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      amenities,
      area,
      price,
      location,
    } = req.body;

    if (!req.files || !req.files["thumbnail"] || !req.files["images"]) {
      return res
        .status(400)
        .json({ message: "thumbnail and images are required" });
    }

    const imagePaths = req.files["images"].map((file) => file.path);
    const thumbnailPath = req.files["thumbnail"][0].path;

    const property = await Property.create({
      title,
      description,
      type,
      amenities: amenities ? JSON.parse(amenities) : [],
      area: parseFloat(area),
      price: parseFloat(price),
      location,
      images: imagePaths,
      thumbnail: thumbnailPath,
      agent: req.user.id,
    });

    res.status(201).json({ message: "Property created successfully", property });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "agent",
      "name email profilePicture phone",
    );
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "agent",
      "name email profilePicture phone",
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check authorization - only agent or admin can update
    if (property.agent.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this property" });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("agent", "name email profilePicture phone");
    
    res.status(200).json({ message: "Property updated successfully", property: updated });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check authorization - only agent or admin can delete
    if (property.agent.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
