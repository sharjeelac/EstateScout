import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const storage = new CloudinaryStorage({
    cloudinary,
    folder : "EstateScout",
    allowedFormats : ["jpg", "png", "jpeg"],
    transformation : [{ width: 500, height: 500, crop: "limit" }]
})

const upload = multer({ storage });

export { cloudinary, upload };