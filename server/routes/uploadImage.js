import express from 'express';
import cloudinary from 'cloudinary';
import { Product, Category } from "../models/index.js";


const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

router.get('/sign', (req, res) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request({
    timestamp: timestamp
  }, process.env.CLOUDINARY_API_SECRET);

  res.json({ timestamp, signature, api_key: process.env.CLOUDINARY_API_KEY });
});

router.post('/save-url', async (req, res) => {
  const { imageUrl, modelType, itemId } = req.body;

  try {
    switch (modelType) {
      case 'category':
        await Category.findByIdAndUpdate(itemId, { icon: imageUrl });
        break;
      case 'product':
        await Product.findByIdAndUpdate(itemId, { image: imageUrl });
        break;
      default:
        return res.status(400).json({ message: "Некорректный тип модели" });
    }
    res.status(200).json({ message: "Изображение обновлено" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при сохранении изображения" });
  }
});


export default router;
