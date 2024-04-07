import mongoose from 'mongoose'
async function  MongoConnect() {
  try {
   await  mongoose.connect(process.env.MONGO_URI);
   console.log('Mongodb connected!')
  } catch (error) {
    console.log(`Error connecting mongodb ${error.message}`);
    process.exit(1);
  }
}

export default MongoConnect