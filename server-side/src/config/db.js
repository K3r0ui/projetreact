import mongoose from "mongoose";

const configDB = async () => {
  const { DB_DNS, DB_PORT } = process.env;

  try {
    await mongoose.connect(`mongodb://${DB_DNS}:${DB_PORT}/project`);
    console.log(`⛏️ ⛏️  connected MONGO DB DATABASE: ${DB_DNS}: ...`);
   // console.log(`mongodb://${DB_DNS}:${DB_PORT}/project`);
  } catch (error) {
    console.log(error);
  }
};

export default configDB;
