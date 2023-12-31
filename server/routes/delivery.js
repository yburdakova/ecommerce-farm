import express from "express";
import { Delivery } from "../models/index.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//ADD DELIVERY POINT

router.post("/add_delivery", verifyTokenAndAdmin, async (req, res) => {
    const newDelivery = new Delivery({
        cityName: req.body.cityName,
        price: req.body.price
    });

    try {
        const savedDelivery = await newDelivery.save();
        res.status(201).json(savedDelivery);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET ALL DELIVERY POINTS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
    const delivery = query
        ? await Delivery.find().sort({ _id: -1 }).limit(5)
        : await Delivery.find();
        res.status(200).json(delivery); 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;