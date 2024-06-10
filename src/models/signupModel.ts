import mongoose, { Schema, Document } from 'mongoose';

export interface Signup extends Document {
    profileImage: string
    email: string;
    password: string;
    username: string;
}

const signupSchema: Schema<Signup> = new Schema({
    profileImage: { type: String, required: true, default: "NA" },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const anonymousSignUpModel = mongoose.models.anonymousSignUp || mongoose.model('anonymousSignUp', signupSchema);

export default anonymousSignUpModel;