import connectDB from "../../../utils/connectDB";
import AdminUser from "../../../models/User"
import bcrypt from 'bcrypt'

connectDB()


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  switch (req.method) {
    case "POST":
      await signin(req, res)
      break
  }
}

const signin = async (req: any, res: any) => {
  const user: any = await AdminUser.findOne({ email: req.body.email }) || null;
  try {

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    } else if (!validPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Password" });
    } else {
      // const data = { name: user.name, email: user.email, password: user.password }

      res.status(200).json({
        success: true,
        message: "Login Success",
        data: user
      })
    }
  } catch (err) {
    if (user == null) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(404).json({ success: false, data: { msg: 'Error signing in', err: err } });
  }
}