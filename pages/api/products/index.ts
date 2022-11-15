import connectDB from "../../../utils/connectDB";
import Product from "../../../models/Product";
connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    switch (req.method) {
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await addProduct(req, res)
            break
    }
}

const getProducts = async (req: any, res: any) => {
    try{
        const products= await Product.find({});
        res.status(200).json({
          success: true,
          data: products
        } )
    }catch(err){
        res.status(500).json({ success: false, message: 'Server not responding' })
    }

}

const addProduct = async (req: any, res: any) => {
    try{
        const { title } = req.body
        const productExist = await Product?.findOne({ title});
        if (productExist) {
            return res
            .status(400)
            .json({ success: false, message: 'Product already exists'});
        }
        
        const newProduct = new Product(req.body)
        const product= await newProduct.save()
        return res.status(200).json({
            success: true,
            message:"Product created",
            data:product
        })
     
    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: 'Error creating product',data:err })
    }

}


// export default async (req, res) => {
//     const {method}= req;
  
//     switch(method){
//         case 'GET':
//             try{
//                 const user= await User.find({});
//                 res.status(200).json({
//                   success: true,
//                   data: user
//                 } )
//             }catch(err){
//                 res.status(500).json({success:false})
//             }
//           break;
  
//           case 'POST':
//               try{
//                   const newuser= await User.create(req.body);
//                   res.status(200).json({
//                     success: true,
//                     data: newuser
//                   } )
//               }catch(err){
//                   res.status(500).json({success:false})
//               }
//             break;
              
//     }
//   };
  