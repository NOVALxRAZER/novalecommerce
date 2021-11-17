const express = require("express")
const app = express();
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session")
const passport = require("passport")
const dotenv = require("dotenv");
const session = require("express-session")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const stripeRouter = require("./routes/stripe")
const passportSetup = require("./passport")
const cors = require("cors")

//Dotenv Confid
dotenv.config();

//Passport Config
require("./passport")(passport);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB")
});

//Express Framework
app.use(express.json());

//Session
app.use(session({
    secret: 'keyboard-cat',
    resave: false,
    saveUninitialized: false,
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));

//Routers
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/checkout", stripeRouter);

//Port & Server Running
app.listen(8500, () => {
    console.log("Server is Up and Running");
})