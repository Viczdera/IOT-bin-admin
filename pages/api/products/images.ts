import cloudinary from "../../../utils/cloudinary"
import { createReadStream } from "streamifier"
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

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req: any, file: any, cb: any) => cb(null, file.originalname),
  }),
});

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
    console.log(upload)
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
      let upload = cloudinary.uploader.upload(file.path,
        {
          upload_preset: "en1ycnhz_primeries",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      return upload
    });
  } catch (err) {
    return err;
  }
};


export default apiRoute;
export const config = {
  api: {
    bodyParser: false
  },
}