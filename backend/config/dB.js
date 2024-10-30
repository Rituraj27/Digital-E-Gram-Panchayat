import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDb = async () =>{
   try {
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("MongoDB connected")
   } catch (error) {
     console.log(error)
     console.log("MongoDB connection error")
   }
}


// export const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Optional: Adjust the timeout as needed
//     });
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); // Exit the process with failure
//   }
// };
