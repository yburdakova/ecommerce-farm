import cloudinary from './cloudinaryConfig';

const uploadImageToCloudinary = (folderName) => {
  return async (req, res, next) => {
    if (!req.file) {
      return next();
    }

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: folderName
      });
      req.imageUrl = result.secure_url; 
      return next();
    } catch (error) {
      return res.status(500).json({ message: "Error uploading image to Cloudinary", error });
    }
  };
};

export default uploadImageToCloudinary;