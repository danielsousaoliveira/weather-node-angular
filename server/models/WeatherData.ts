import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    date: { type: Date, required: true },
    temperature: { type: Number, required: true },
    networkPower: { type: Number, required: true, min: 1, max: 5 },
    rainingStatus: { type: String, required: true },
    altitude: { type: Number, required: true },
    timezone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Weather", weatherSchema);
