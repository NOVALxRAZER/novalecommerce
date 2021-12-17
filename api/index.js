const express = require("express")
const app = express();
const mongoose = require("mongoose")
const passport = require("passport")
const dotenv = require("dotenv")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const stripeRouter = require("./routes/stripe")
const cors = require("cors")

//Dotenv Confid
dotenv.config();

//Passport Config
require("./passport")(passport);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
});

//Express Framework
app.use(express.json());

//Session
app.use(session({
    secret: 'keyboard-cat',
    maxAge: 24 * 60 * 60 * 100,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//CORS Whitelist
// let whitelist = [
//     `http://localhost:3000/`,
//     `http://localhost:4000/`,
//     `http://localhost:8500/`,
//     `https://accounts.google.com/`
// ];

// let corsOptionsDelegate =  (req, callback) => {
//     let corsOptions;
//     if(origin === undefined || whitelist.indexOf(req.header('Referer')) !== -1){
//         // console.log(req.header('Referer'));
//         corsOptions = {
//             origin: true,
//             methods: "GET,POST,PUT,DELETE",
//             credentials: true,
//         }
//         callback(null, corsOptions)
//     }else{
//         callback(new Error('Not Allowed by CORS'))
//     }
// }
// //CORS
// app.use(cors(corsOptionsDelegate))

//CORS Whitelist
let whitelist = [
    `http://localhost:3000`,
    `http://localhost:4000`,
];

let corsOptions = {
    origin: (origin, callback) => {
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}
//CORS
app.use(cors(corsOptions))

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