const router = require("express").Router();
const User = require("../models/User")
const passport = require("passport")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//Google
router.get("/login/success", (req,res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            // cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        success: false,
        message: "failed login",
    });
});

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("http://localhost:3000/login");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/login/failed"}),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong Username");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const pass = hashedPassword.toString(CryptoJS.enc.Utf8);
        pass !== req.body.password && res.status(401).json("Wrong Password");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            {expiresIn:"30d"}
        );

        const {password, ...others} = user._doc;
        return res.status(200).json({...others, accessToken});
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router