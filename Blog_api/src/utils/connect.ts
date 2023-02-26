import mongoose from "mongoose";
import config from "config";

export function Connect() {
     mongoose.connect(`mongodb://127.0.0.1:27017/${config.get<string>('dbName')}`), () => {
    console.log("MongoDb is connected")
};
}