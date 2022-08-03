import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';
import multer from 'multer';
import path from 'path';
import nc from 'next-connect';

export const config = {
    api: {
        bodyParser: false
    }
};

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public", "CompanyEvents"));
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "_" + file.originalname);
        },
    }),
});

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
    .use(upload.single("image"))
    .post(async (req, res) => {
        const session = await getSession({ req });
        if(session){
            try{
                const { name, location, description } = req.body;
                const { filename } = req.file;
                console.log(req.body);
                console.log(req.file);
                const ourEvent = await prisma.companyEvents.create({
                    data : {
                        name : name,
                        location : location,
                        description : description,
                        picture : filename
                    }
                });
                if(ourEvent){
                    return res.json({
                        message : "Event inserted successfully!"
                    })
                }else {
                    return res.json({
                        message : "Error inserting Event!"
                    })
                }
            } catch (e) {
                return res.json({
                    error : e.message
                })
            }
        }else {
            return res.json({
                message : "Not Authenticated!"
            })
        }
    })

export default handler;
