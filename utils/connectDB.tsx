import mongoose from "mongoose";

const mongoDbUrl: string = process.env.MONGODB_URL!;
const connectDB = () => {
  if (mongoose?.connections[0].readyState) {
    //console.log("Database connected");
    return;
  }
  mongoose.connect(mongoDbUrl),
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err: any) => {
      if (err) {
        throw err;
      }
      //console.log("Database Connected");
    };
};
export default connectDB;

//! tells ts that you can trust its not null even though it looks like
