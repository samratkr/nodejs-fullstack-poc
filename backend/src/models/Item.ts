import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

export default mongoose.model<IItem>("Item", ItemSchema);
