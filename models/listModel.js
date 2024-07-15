import mongoose from "mongoose";

const dt = new Date();
const todoSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  priority: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const List = mongoose.model("List", todoSchema);
