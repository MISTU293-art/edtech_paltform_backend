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

    const courseIds = courses.map((course) => course._id);

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

async function deleteCourse(req, res) {
  try {
    const { _id } = req.params;
    const data = await courseModel.findOne({ _id });
    return res.status(404).json({
      message: "Course not Found",
    });
    await courseModel.deleteOne({ _id });
    return res.status(200).json({
      message: "Course Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}

async function updateCourse(req, res) {
  try {
    const { _id } = req.params;
    const { title, price } = req.body;
    console.log(req.body);
    const course = await courseModel.findOneAndUpdate(
      { _id },
      { title, price },
      { new: true },
    );
    return res.status(200).json({
      message: "Course Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
export { createCourse, courseSellAnalysis, deleteCourse, updateCourse };
