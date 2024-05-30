import mongoose, { Schema, Document } from "mongoose";

export interface IsUserLikes extends Document {
  userId: string,
  createdAt: Date
}

const LikedMeUser: Schema<IsUserLikes> = new Schema({
  userId: {
      type: String,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  }
})

/*export interface PostDetails extends Document {
  username: string;
  image?: string;
  description?: string;
  likes: number;
  LikedUser: IsUserLikes[]
}*/

const postDetailsSchema = new Schema({
  username: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  likes: { type: Number, default: 0 },
  LikedUser: {
    type: [LikedMeUser],
    default: []
  }
}, { timestamps: true });

const postDetailsModel =
  mongoose.models.postDetailsAnnonymous || mongoose.model("postDetailsAnnonymous", postDetailsSchema);

export default postDetailsModel;