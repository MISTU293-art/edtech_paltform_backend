import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  price: {
    type: String,
  },
},{
    timestamps:true
});

const courseModel = mongoose.model("course",courseSchema);
export default courseModel