import mongoose from "mongoose"
export default async function Connect(){
   try {
      await mongoose.connect(process.env.DATABASE_url!)
      console.log("Database conntion ")
   } catch (error) {
    console.error("database the error",error)
   }
}