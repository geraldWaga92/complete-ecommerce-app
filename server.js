import express from "express"
// eslint-disable-next-line no-unused-vars
import colors from "colors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";

//configure env
dotenv.config();

// rest object
const app = express();

//databse config
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));




// rest api
app.get("/", (req, res) => {
    res.send({
        message: "welcome to my app"
    })
})

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});