/* eslint-disable import/no-anonymous-default-export */
import Product from "../../../models/Product";
import connectDb from "../../../utils/connectDB";

connectDb();

export default async (req:any, res:any) => {
  const {
    method,
    query: { id } //same as file name
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res
          .status(400)
          .json({ success: false, message: 'Product not found'});
          
        }
        res.status(200).json({
          success: true,
          message:"Success",
          data:product
      })
      } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching product',data:err })
      }
      break;
  }
};
