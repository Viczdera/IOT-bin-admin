import connectDB from "../../../utils/connectDB";
import AdminUser from "../../../models/User"
import bcrypt from 'bcrypt'
connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    switch (req.method) {
        case "POST":
            await signup(req, res)
            break
    }
}

const signup = async (req: any, res: any) => {
    try {
        const { user_name, email, phone, password, c_password } = req.body

        //encrypt
        const msalt = await bcrypt.genSalt(12)
        const passHashed = await bcrypt.hash(password, msalt)
        // const userExist = await AdminUser.findOne({ "$or": [{ email: email }, { phone: phone }] });
        const userExist = await AdminUser?.findOne({ email });
        const newAdminUser = new AdminUser({ user_name, email, phone, password: passHashed })
        if (userExist) {
            return res
                .status(400)
                .json({ error: "Email or Phone number already exists" });
        }
        const user = await newAdminUser.save()
        return res.status(200).json({
            success: true,
            message:"Signup Successful",
            data: user
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server not responding' });
    }
}