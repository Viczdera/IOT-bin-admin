import cloudinary from "../../../utils/cloudinary"
import { createReadStream } from "streamifier"
import { memoryStorage } from "multer"
const multer = require('multer')
const nextConnect = require('next-connect')

// eslint-disable-next-line import/no-anonymous-default-export
// export default async (req: any, res: any) => {
//     switch (req.method) {
//         case "POST":
//             await images(req, res)
//             break
//     }
// }
const storage=memoryStorage()
const upload = multer({storage});

const apiRoute = nextConnect({
  onError(error: any, req: any, res: any) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: any, res: any) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: any, res: any) => {
  try {
    const upload: any = await fileUpload(req.file);
    return res.status(200).json({ success: true, data: upload.secure_url });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: err, message: "Server not responding!" });
  }
});

const fileUpload = (file: any) => {
  try {
    return new Promise((resolve, reject) => {
      console.log(file)
      let upload = cloudinary.uploader.upload_stream(
        {
          upload_preset: "en1ycnhz_primeries",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        },
        (error: any, result: any) => {
          if (result) {
            console.log(result)
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      return createReadStream(file.buffer).pipe(upload)
    });
  } catch (err) {
    console.log(err)
    return err;
  }
};


export default apiRoute;
export const config = {
  api: {
    bodyParser: false
  },
}