import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';

const router = express.Router();

cloudinary.v2.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).send("Upload error");
  }
});

export default router;
