import "express-async-errors";
import { ConnectOptions } from "mongoose";
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { csvToJson } from "./utils/csv";

dotenv.config({ path: "./.env" });
// configurer cloudinary
cloudinary.v2.config({
  cloud_name: "dx8obnscc",
  api_key: "568434899362299",
  api_secret: "eQNZbRpMwAMQVbHNHKatckaGMcQ",
  secure: true,
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("DB conected");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
