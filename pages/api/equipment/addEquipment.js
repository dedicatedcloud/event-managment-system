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
            cb(null, path.join(process.cwd(), "public", "Equipment"));
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
        try {
            const session = await getSession({ req });
            if(session){
                const { name, price } = req.body;
                const { filename } = req.file;
                const equipment = await prisma.equipment.create({
                    data : {
                        name : name,
                        price : parseInt(price),
                        picture : filename
                    }
                });
                prisma.$disconnect();
                if(!equipment){
                    res.json({
                        error : "Error Occurred while Inserting!"
                    })
                }else {
                    const equipment = await prisma.equipment.findMany({});
                    prisma.$disconnect();
                    res.json({
                        equipment
                    });
                }
            }else {
                return res.json({
                    message : "Not Authenticated!"
                })
            }
        }catch (e) {
            return res.json({
                message : e.message
            })
        }
    })

export default handler;
/*export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const { name, price } = req.body;
            const equipment = await prisma.equipment.create({
                data : {
                    name,
                    price : parseInt(price),
                }
            });
            if(equipment){
                const data = await prisma.equipment.findMany({});
                return res.json({
                    data
                });
            }
        }
        else {
            return res.json({
                message : "Not Authenticated!"
            });
        }
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}*/
