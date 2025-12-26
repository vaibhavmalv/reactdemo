import mongoose from "mongoose";

const ContactInfoSchema = new mongoose.Schema({
    fatherName: { type: String },
    motherName: { type: String },
    children: [{ type: String }],
    gender: { type: String, enum: ["male", "female", "other"] },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("ContactInfo", ContactInfoSchema);
