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
            cb(null, path.join(process.cwd(), "public", "Venues"));
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
            let venue;
            const { id } = req.body;
            if(!req.file) {
                let {field, value} = req.body;
                if(field === "price" || field === "guestCountId"){
                    value = parseInt(value);
                }
                try {
                    venue = await prisma.venues.update({
                        where: {
                            id: parseInt(id),
                        },
                        data: {
                            [field]: value,
                        },
                    });
                } catch (e) {
                    return res.json({
                        error: e.message
                    });
                }
            }else {
                const { filename } = req.file;
                try {
                    venue = await prisma.venues.update({
                        where: {
                            id: parseInt(id),
                        },
                        data: {
                            picture : filename,
                        },
                    });
                } catch (e) {
                    return res.json({
                        error: e.message
                    });
                }
            }
            if(venue){
                return res.json({
                    message: "Venue updated successfully!",
                });
            }
            else{
                return res.json({
                    message: "Venue not updated!"
                });
            }
        }else {
            return res.json({
                message : "Not Authenticated!"
            })
        }
    })

export default handler;
