import mongoose from "mongoose";
import config from "config";

export function Connect() {
     mongoose.connect(`mongodb+srv://thuranyi64:beepj7nxzbXFE2vq@cluster0.3paxozw.mongodb.net/?retryWrites=true&w=majority`), () => {
    console.log("MongoDb is connected")
};
}