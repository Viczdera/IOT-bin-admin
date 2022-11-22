import mongoose, { Schema, model, models, Model } from "mongoose";
//interface repres a doc in mongoDb
interface IProduct {
  title: string;
  description: string;
  price:{ ngn:any,usd:any};
  sku: string;
  quantity: number;
  priceDiscounted: { ngn:any,usd:any};
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
    description: {
      type: String,
    },
    price: {
      type:Object,
    },
    sku: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    priceDiscounted: {
      type: Object,
    },
    variants: {
      type: [],
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
      type: [Object],
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
