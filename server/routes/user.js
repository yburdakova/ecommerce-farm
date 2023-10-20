import express from "express";

const router = express.Router();

router.get("/usertest", (req, res) => {
    res.send("user test is successful")
});

router.post("/userposttest", (req, res) => {
    const username = req.body.username;
    res.send("You name is" + username);
});

export default router;