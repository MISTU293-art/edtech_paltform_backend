import mongoose from "mongoose";

const studentPurchaseSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },

    paymentId: {
      type: String,
      default: null,
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const purchaseModel = mongoose.model("purchase",studentPurchaseSchema);

export default purchaseModel;