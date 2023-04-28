import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars
import colors from "colors";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_KEY);
        console.log(
            `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
        );
    } catch (error) {
        console.log(`Errro in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;