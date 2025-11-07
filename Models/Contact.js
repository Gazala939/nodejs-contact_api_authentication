import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {type:String, requre:true},
    email: {type:String, requre:true},
    phone: {type:String, requre:true},
    type:{type:String,require:true},
    createdAt: {type:Date, default:Date.now},
    user:{type:mongoose.Schema.Types.ObjectId}
});

export const Contact = mongoose.model("Contact", contactSchema);