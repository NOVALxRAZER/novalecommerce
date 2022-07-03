const router = require("express").Router();
const User = require("../models/User");
const GoogleUser = require("../models/GoogleUser")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//Create a User
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.image,
        isAdmin: req.body.isAdmin,
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update a User & Google User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log(req.params.id, 'ini masuk')
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        console.log(CryptoJS.AES.decrypt(req.body.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8), 'hasil decrypt')
    }
    try {
        if (req.user.userType === 1) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true }
            );
            // console.log(req.params.id, req.body, "ini reqw user kita")
            const { password, ...others } = updatedUser._doc;
            others.response = 1;
            res.status(200).json(others);
        }
        else if (req.user.userType === 2) {
            const updatedGoogle = await GoogleUser.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true }
            );
            // console.log(req.user, "ini req user")
            updatedGoogle.response = 1;
            res.status(200).json(updatedGoogle);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete a User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been Deleted.")
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get a User
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // const { password, ...others } = user._doc;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All Users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User Stats or Date
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
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
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router