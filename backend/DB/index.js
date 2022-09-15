import mongoose from "mongoose";
import { config } from "dotenv";
config();

const { connect } = mongoose
const DB = process.env.DB

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

connect(`${DB}`, options).then(
    () => {
      console.log("DB Ready To Use");
    },
    (err) => {
      console.log(err);
    }
  );
