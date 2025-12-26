import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    phoneNumber: { type: String },
    address: { type: String },
    // store image as base64 string and mime type
    image: { type: String },
    imageMime: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true, versionKey: false });

export default mongoose.model("UserInfo", UserInfoSchema);
