import Address from "../../models/Address.models.js";
import User from "../../models/User.models.js";

// add address
export const addAddress = async(req,res)=>{
    try{
        const {userId,address,city,pincode,phone,notes} = req.body;
        if(!userId || !address || !city || !pincode || !phone){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials!!"
            });
        }
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"user cant find!"
            })
        }
        const newAddd = new Address({
            userId,address,city,pincode,phone,notes
        });
        await newAddd.save();
        return res.status(200).json({
            success:true,
            message:"Address added successfully",
            data:newAddd
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Error coming"
        })
    }
}

export const fetchAllAddress = async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"user cant find!"
            })
        }
        const addresses = await Address.find({userId});
        return res.status(200).json({
            success:true,
            message:"Addresses fetched successfully",
            data:addresses
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Error coming"
        })
    }
}

export const deleteAddress = async(req,res)=>{
try{
    const {addressId,userId} = req.params;
    if(!addressId || !userId){
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials!!"
        });
    }
    const deletedAddress = await Address.findByIdAndDelete({ _id: addressId, userId });
    if(!deletedAddress){
        return res.status(404).json({
            success:false,
            message:"Address not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Address deleted successfully"
    })
}catch(e){
    return res.status(500).json({
        success:false,
        message:"Error coming"
    })
}
}

export const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.error("Error in updateAddress:", e);
    return res.status(500).json({
      success: false,
      message: "Error updating address",
    });
  }
};