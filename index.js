const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const passport = require("passport")

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config()
}
require("./src/utils/connectdb")


require("./src/authen/strategies/JWTStrategy")
require("./src/authen/strategies/localStrategy")
require("./src/authen/authenticate")

const userRouter = require(".src/user/routes/Routes")


const app = express()

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },

    credentials: true,
}

app.use(cors(corsOptions))

app.use(passport.initialize())

app.use("/users", userRouter)


//setting up server
const port = process.env.PORT || 5000;
app.get("/", function (req, res) {
    res.send({ status: "success" })
})

//Start the server in port 5000

app.listen(port, (err) => {
    if (err) {
        console.errovr(err);
    }
    else {
        console.log("server running at http://localhost:", port)
    }


});
