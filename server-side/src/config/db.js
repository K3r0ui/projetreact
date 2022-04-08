import mongoose from "mongoose";

const configDB = async () => {
  const { DB_DNS, DB_PORT } = process.env;

  try {
    await mongoose.connect(`mongodb+srv://projet:sHCocxYhsywjSSDc@cluster0.9det8.mongodb.net/projet_react?retryWrites=true&w=majority`);
    console.log(`⛏️ ⛏️  connected MONGO DB DATABASE: ${DB_DNS}: ...`);
   // console.log(`mongodb://${DB_DNS}:${DB_PORT}/project`);
  } catch (error) {
    console.log(error);
  }
};

export default configDB;
