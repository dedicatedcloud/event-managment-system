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
        try {
            const session = await getSession({ req });
            if(session){
                const { name, location, price, guestCount } = req.body;
                const { filename } = req.file;
                const venue = await prisma.venues.create({
                    data : {
                        name : name,
                        location : location,
                        price : parseInt(price),
                        guestCountId : parseInt(guestCount),
                        picture : filename
                    }
                });
                if(!venue){
                    res.json({
                        error : "Error Occurred while Inserting!"
                    })
                }else {
                    const venues = await prisma.venues.findMany({});
                    res.json({
                        venues
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
            const form = formidable();
            form.parse(req, async function (err, fields, files) {
                // await saveFile(files.image);
                const { name, location, price, guestCount } = fields;
                console.log(name[0], location[0], price[0], guestCount[0], files.image);

                /!*const venue = await prisma.venues.create({
                    data : {
                        name : name[0],
                        location : location[0],
                        price : parseInt(price[0]),
                        guestCountId : guestCount[0],
                        picture : files.image[0].originalFilename
                    }
                });
                if(venue){
                    const data = await prisma.venues.findMany({
                        include : {
                            guest : true
                        }
                    });
                    return res.json({
                        data
                    });
                }*!/
            });

            //for saving the image in new location
            const saveFile = async (file) => {
                console.log(file)
                /!*const data = fs.readFileSync(new URL(`file:${file.path}`));
                fs.writeFileSync(`./public/${file.name}`, data);
                await fs.unlinkSync(file.path);
                return;*!/
                /!*fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!')
                })*!/
            };

            // const { name, location, price, guestCount } = req.body;

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
