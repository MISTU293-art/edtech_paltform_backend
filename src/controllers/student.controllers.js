import courseModel from "../models/Course.models.js";
import purchaseModel from "../models/StudentPurchase.models.js";
import cryptoRandomString from "crypto-random-string";
async function allCourse(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const course = await courseModel
      .find()
      .populate("instructor", "username")
      .skip(skip)
      .limit(limit);
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

async function buyCourse(req, res) {
  try {
    const { amountPaid, paymentStatus = "completed", courseId } = req.body;
    const PaymentId = cryptoRandomString({ length: 10, type: "numeric" });

    const buyData = await purchaseModel.create({
      amountPaid,
      paymentStatus,
      paymentId: PaymentId,
      courseId,
      student: req.user._id,
      course: courseId,
    });
    return res.status(201).json({
      message: "Course Purchase Successfully",
      buyData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function viewPurchasedCourse(req, res) {
  try {
    const student = req.user._id;

    const data = await purchaseModel.findOne({ student }).populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "name username createdAt",
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "No purchased course found",
      });
    }

    return res.status(200).json({
      data,
      instructor: data.course.instructor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export { allCourse, buyCourse, viewPurchasedCourse };
