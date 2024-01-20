import express from "express";
import { Category } from "../models/index.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//ADD CATEGORY

router.post("/add_category", verifyTokenAndAdmin, async (req, res) => {
    const newCategory = new Category({
        title: req.body.title,
        icon: req.body.icon
    });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
        console.log(err.message)
    }
});

//GET ALL CATEGORIES

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
    const categories = query
        ? await Category.find().sort({ _id: -1 }).limit(5)
        : await Category.find();
    res.status(200).json(categories);
    } catch (err) {
    res.status(500).json(err);
    }
});

//DELETE CATEGORY

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
    } catch (err) {
    res.status(500).json(err);
    }
});

//UPDATE CATEGORY

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    
    try {
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
        $set: req.body,
        },
        { new: true }
    );
    res.status(200).json(updatedCategory);
    } catch (err) {
    res.status(500).json(err);
    }
});

export default router;

