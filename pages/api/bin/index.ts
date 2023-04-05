import connectDB from "../../../utils/connectDB";
import AdminUser from "../../../models/User"
import bcrypt from 'bcrypt'
import { onValue, ref } from "firebase/database";
import { app, fireDB } from "..";

connectDB()
app;

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