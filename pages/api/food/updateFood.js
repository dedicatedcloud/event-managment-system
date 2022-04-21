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
                let food;
                const { id } = req.body;
                if(!req.file) {
                    let {field, value} = req.body;
                    if(field === "price"){
                        value = parseInt(value);
                    }
                    try {
                        food = await prisma.food.update({
                            where: {
                                id: parseInt(id),
                            },
                            data: {
                                [field]: value,
                            },
                        });
                        prisma.$disconnect();
                    } catch (e) {
                        return res.json({
                            message: e.message
                        });
                    }
                }else {
                    const { filename } = req.file;
                    try {
                        food = await prisma.food.update({
                            where: {
                                id: parseInt(id),
                            },
                            data: {
                                picture : filename,
                            },
                        });
                        prisma.$disconnect();
                    } catch (e) {
                        return res.json({
                            message: e.message
                        });
                    }
                }
                return res.json({
                    food,
                    message : "Record Updated Successfully!"

                });
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
            const { id, field, value } = req.body;
            console.log(req.body);
            let food;
            try {
                food = await prisma.food.update({
                    where: {
                        id : id,
                    },
                    data: {
                        [field] : value,
                    },
                });
            }catch(e){
                return  res.json({
                    message : e.message
                });
            }
            return res.json({
                food,
                message : "Record Updated Successfully!"

            });
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
