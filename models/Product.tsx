import mongoose, { Schema, model, models, Model } from "mongoose";
//interface repres a doc in mongoDb
interface IProduct {
  title: string;
  vendor: any;
  description: string;
  price: number;
  sku: string;
  quantity: number;
  priceDiscounted: number;
  variants: any;
  options: any[];
  images: [string];
  image: string;
  status: string;
}
const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    sku: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    priceDiscounted: {
      type: Number,
    },
    variants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Variant",
      required: true,
    },
    options: {
      type: [
        {
          name: String,
          values: [String],
        },
      ],
      default: [{ name: "Title", values: ["Default Title"] }],
    },
    images: {
      type: [String],
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      default: "inActive",
    },
  },
  { timestamps: true, versionKey: false }
);
export default (models.Product
  ? models.Product
  : model("Product", ProductSchema)) as Model<IProduct>;
