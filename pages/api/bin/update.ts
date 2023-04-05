import connectDB from "../../../utils/connectDB";
import AdminUser from "../../../models/User"
import bcrypt from 'bcrypt'
import { ref, set, update } from "firebase/database";
import { fireDB, messageClient } from "..";

connectDB()


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    switch (req.method) {
        case "POST":
            await updateservo(req, res)
            break
    }
}

const sendMessage = (message:string) => {
    messageClient.messages
        .create({
            body: message,
            from: "+15855802207",
            to: "+2348168321836"
        })
        .then((message: any) => {
            console.log(message)
        }).catch((error: any) => {
            // You can implement your fallback code here
            console.log(error);
        });
    // messageClient.calls
    //   .create({
    //     url: 'http://demo.twilio.com/docs/voice.xml',
    //     from: "+15855802207",
    //     to: "+2348168321836"
    //   })
    //   .then((call:any) => console.log(call.sid));

}
const updateservo = async (req: any, res: any) => {
    const user: any = await AdminUser.findOne({ email: req.body.email }) || null;
    try {
        const { bin, servo } = req.body

        if (bin == 1) {
            let bin1Ref = ref(fireDB, "sensor_data/bins/bin1");

            update(bin1Ref, { servo: servo }).then(() => {

                if(servo=='off'){
                    sendMessage("SMART BIN ALERT: Bin 1 is full and needs to be emptied. Please take action as soon as possible to prevent any overflow or other issues. Thank you.")
                }
                res.status(200).json({
                    success: true,
                    message: "Bin updated",
                    //    data: user
                })


            }).catch((err) => {
                return res.status(404).json({ success: false, message: "Error updating bin" });
            })
        } else if (bin == 2) {
            let bin2Ref = ref(fireDB, "sensor_data/bins/bin2");

            update(bin2Ref, { servo: servo }).then(() => {
                if(servo=='off'){
                    sendMessage("SMART BIN ALERT: Bin 2 is full and needs to be emptied. Please take action as soon as possible to prevent any overflow or other issues. Thank you.")
                }
                res.status(200).json({
                    success: true,
                    message: "Bin updated",
                    //    data: user
                })
            }).catch((err) => {
                return res.status(404).json({ success: false, message: "Error updating bin" });
            })
        }

    } catch (err) {
        if (user == null) {
            return res.status(404).json({ success: false, message: "Error updating bin" });
        }
        res.status(404).json({ success: false, data: { msg: 'Error ', err: err } });
    }
}