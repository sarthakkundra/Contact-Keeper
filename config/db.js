const mongoose = require("mongoose");
const config = require("./default.json");
const db = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("DB initiated successfully");
  } catch (e) {
    console.log(e);
  }
};


module.exports = connectDB;