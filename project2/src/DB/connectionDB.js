import mongoose from "mongoose"
import { DB_URI } from "../../config/config.service.js"

// Establishing the connention for the Database
const checkConnectionDB = async () => {
    await mongoose.connect(DB_URI)
        .then(() => {
            console.log(`DB connected successfully, DB: ${DB_URI}`);
        })
        .catch((Error) => {
            console.log("Failed to connect with DB", Error);
        })
} 

export default checkConnectionDB