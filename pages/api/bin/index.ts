import connectDB from "../../../utils/connectDB";
import AdminUser from "../../../models/User"
import bcrypt from 'bcrypt'
import { onValue, ref } from "firebase/database";
import { app, fireDB, messageClient } from "..";
connectDB()
app;

const sendMessage = (message: string) => {
    messageClient.messages
        .create({
            body: message,
            from: "+15855802207",
            to: "+2348166371836"
        })
        .then((message: any) => {
            console.log(message)
        }).catch((error: any) => {
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
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    switch (req.method) {
        case "GET":
            await bindata(req, res)
            break
    }
}

const bindata = async (req: any, res: any) => {
    let sensor_dataRef = ref(fireDB, "sensor_data/bins")

    try {

        onValue(sensor_dataRef, (snapshot: any) => {
            const data = snapshot.val();
            console.log(data)
            
            Object.values(data).map((m: any | {}, i: string | number) => {
                let level = m?.level
                if(level>50){
                    m.level=80
                }
                if (level < 20) {
                    if (i == 0) {
                        sendMessage("SMART BIN ALERT: Bin 1 is full and needs to be emptied. Please take action as soon as possible to prevent any overflow or other issues. Thank you.")
                    } else if (i == 1) {
                        sendMessage("SMART BIN ALERT: Bin 2 is full and needs to be emptied. Please take action as soon as possible to prevent any overflow or other issues. Thank you.")
                    }
                }
            })
            if (Object.keys(data).length == 0) {
                return res.status(404).json({ success: false, message: "No bin data" });

            } else {

                res.status(200).json({
                    success: true,
                    message: "Success",
                    data: data
                })
            }
        })

    } catch (err) {

        res.status(404).json({ success: false, data: { msg: 'Error getting data', err: err } });
    }
}