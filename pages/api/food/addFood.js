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
            cb(null, path.join(process.cwd(), "public", "Food"));
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
                const { name, price, category } = req.body;
                const { filename } = req.file;
                const food = await prisma.food.create({
                    data : {
                        name : name,
                        price : parseInt(price),
                        category : category,
                        picture : filename
                    }
                });
                if(!food){
                    res.json({
                        error : "Error Occurred while Inserting!"
                    })
                }else {
                    const equipment = await prisma.food.findMany({});
                    res.json({
                        food
                    })
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
            const { name, category, price } = req.body;
            const food = await prisma.food.create({
                data : {
                    name,
                    category,
                    price : parseInt(price),
                }
            });
            if(food){
                const data = await prisma.food.findMany({});
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
