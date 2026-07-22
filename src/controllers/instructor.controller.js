import courseModel from "../models/Course.models.js";
import uploadFile from "../services/stroage.services.js";
import purchaseModel from "../models/StudentPurchase.models.js";

async function createCourse(req, res) {
  try {
    const { title, price } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));
    const course = await courseModel.create({
      title,
      price,
      uri: result.url,
      instructor: req.user._id,
    });

    return res.status(201).json({
      message: "Course Created",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function courseSellAnalysis(req, res) {
  try {
    const instructorId = req.user._id;

    // Find all courses owned by this instructor
    const courses = await courseModel.find({ instructor: instructorId });

    const courseIds = courses.map(course => course._id);

    // Find all purchases for those courses
    const purchases = await purchaseModel
      .find({ course: { $in: courseIds } })
      .populate("student", "name username")
      .populate("course", "title");

    return res.status(200).json({
      totalCourses: courses.length,
      totalSales: purchases.length,
      purchases,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
export { createCourse, courseSellAnalysis };
