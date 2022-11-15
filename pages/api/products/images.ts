import cloudinary from "../../../utils/cloudinary"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    switch (req.method) {
        case "POST":
            await images(req, res)
            break
    }
}

const images = async (req: any, res: any) => {
    const image = req.body
    const upload = await cloudinary.uploader.upload(image, {
        upload_preset: 'en1ycnhz_primeries',
        allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    }, function (error, result) {
        if (error) {
            let error_={
                name: error.name, message: error.message
            }
           console.log(error_)
           return error_;
        }
       console.log(result);
       return result;
    })
    try {

        return res.status(200).json({
            success: true,
            data: upload
        })

    } catch (err) {
        console.log(err)
       return res.status(500).json({ success: false, error: err, message: 'Server not responding' });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
}