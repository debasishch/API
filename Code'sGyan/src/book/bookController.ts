import { Request, Response, NextFunction} from "express"
import cloudinary from "../book/cloudinary";

const createBook=async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{

    // const{}=req.body;

    console.log("files",req.files)

    // const files = req.files as 

    // const uploadResult= await cloudinary.uploader.upload(filePath,{

    //     filename_override: __filename,
    //     folder: "book_covers",
    //     format: coverImageMimeType

    // })

    res.json({});
};

export {createBook};
