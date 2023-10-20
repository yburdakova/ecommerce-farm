import express from "express";
import { User } from "../models/index.js";
import CryptoJS from "crypto-js";

const router = express.Router();

// REGISTER

router.post("/register", async (req, res) => {

    try {
        
        if (
            !req.body.username ||
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).send({
                message: 'Please Send All Required Fields: name, email, password',
            });
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.PASSWORD_SECRET.toString()
            )
        });
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }

    
});

// LOGIN

router.post("/login", async (req, res) => {

    try {
        
        if (
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).send({
                message: 'Please Send All Required Fields: email, password',
            });
        }

        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(401).send("Wrong credentials! Please try again");
        }
        

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASSWORD_SECRET.toString()
        )
        
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).send("Wrong credentials! Please try again");
        }
        
        const {password, ...others} = user._doc;
        res.status(200).json(others)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "ERROR" + error.message });
    }

    
});



export default router;

