// STEP - 01 - CLOUDINARY SETUP - 

const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');

// STEP - 02 - Setup API KEYS REFERENCES - 

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET_KEY
});
function ImageUpload(){
// STEP - 03  Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Practicals', // Folder name in Cloudinary
      allowed_formats: ['jpg', 'png'],
    },
  });
// STEP - 04

  const upload = multer({ storage });

  return upload;
}


async function ImageDelete(req, res, next) {
  try {
    const { OLDimageID } = req.body; // Corrected this line
    console.log("Extracted imageID:", OLDimageID);
    if (!OLDimageID) {
      return res.status(400).json({ error: "Image ID is required." });
    }
    await cloudinary.uploader.destroy(OLDimageID);
    next(); // Move to the next middleware (deleteUser)
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image from Cloudinary." });
  }
}



module.exports ={ImageUpload ,ImageDelete }