import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: Array, default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    viewsCount: { type: Number, default: 0 },
    imageUrl: String,
  },
  { timestamps: true }
);
export default mongoose.model("Post", PostSchema);
