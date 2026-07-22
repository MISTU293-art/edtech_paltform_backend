import courseModel from "../models/Course.models.js";
import purchaseModel from '../models/StudentPurchase.models.js'
async function allCourse(req, res) {
  try {
    const course = await courseModel.find().populate("instructor", "username");
    return res.status(200).json({
      message: "All Course Fetched",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function buyCourse(req,res) {
try{
    const {amountPaid,paymentStatus="completed",paymentId}=req.body;

}
catch(error){
    console.log(error);
    return res.status(500).json({
        message:"Internal Server Error"
    })
}
    
}

export { allCourse };
