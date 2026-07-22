import courseModel from "../models/Course.models.js";
import uploadFile from "../services/stroage.services.js";

async function createCourse(req, res) {
 try{
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
    message:"Course Created",
    course
  })
 }
 catch(error){
    console.log(error)
    return res.status(500).json({
        message:"Internal Server Error"
    })
 }
}

export {createCourse}