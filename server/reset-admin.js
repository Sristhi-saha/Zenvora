import "./config/env.js";
import connectDB from "./db/index.js";
import bcrypt from "bcryptjs";
import User from "./models/User.models.js";


const reset = async ()=>{
    await connectDB();
    const newHashedPassword = await bcrypt.hash("admin123",12);

    //update the user by email
    const updateUser = await User.findOneAndUpdate(  { role: "admin" }, // finds your admin user
    { password: newHashedPassword },
    { new: true }
)

if(updateUser){
 console.log(`✅ Success! Password for ${updatedUser.email} is now: admin123`);
}else{
 console.log(`✅ Success! Password for ${updatedUser.email} is  not updated yet`);
}

}

reset();