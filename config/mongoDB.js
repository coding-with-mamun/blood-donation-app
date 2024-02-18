import mongoose from "mongoose";

// connect mongodb
const mongoDBConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connection successful`.bgCyan.black);
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};

// export mongodb
export default mongoDBConnect;
