import connectDB from "../../../utils/connectDB";
import Product from "../../../models/Product";
connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    switch (req.method) {
       
        case "POST":
            await deleteProduct(req, res)
            break
    }
}

const deleteProduct = async (req: any, res: any) => {
    try{
        const {items}=req.body
        //console.log(items)
        const products= await Product.deleteMany({_id:{$in:items}})
        res.status(200).json({
          success: true,
          data: products
        } )
    }catch(err){
        res.status(500).json({ success: false, message: 'Server not responding' })
    }

}