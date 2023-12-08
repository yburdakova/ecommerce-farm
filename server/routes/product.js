import express from "express";
import { Product } from "../models/index.js";
import CryptoJS from "crypto-js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";
const router = express.Router();

//NEW PRODUCT
router.post("/add_product", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        decription: req.body.decription,
        image: req.body.image,
        categories: req.body.categories,
        measure: req.body.measure,
        price: req.body.price
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    
    try {
    const updatedUser = await Product.findByIdAndUpdate(
        req.params.id,
        {
        $set: req.body,
        },
        { new: true }
    );
    res.status(200).json(updatedUser);
    } catch (err) {
    res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
    } catch (err) {
    res.status(500).json(err);
    }
});

//GET ONE PRODUCT
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
    const user = await Product.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
    } catch (err) {
    res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
    const users = query
        ? await Product.find().sort({ _id: -1 }).limit(5)
        : await Product.find();
    res.status(200).json(users);
    } catch (err) {
    res.status(500).json(err);
    }
});

//GET PRODUCT STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
    const data = await Product.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
        $project: {
            month: { $month: "$createdAt" },
        },
        },
        {
        $group: {
            _id: "$month",
            total: { $sum: 1 },
        },
        },
    ]);
    res.status(200).json(data)
    } catch (err) {
    res.status(500).json(err);
    }
});


export default router;