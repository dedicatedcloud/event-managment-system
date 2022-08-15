import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import AES from "crypto-js/aes";
import nc from "next-connect";
import cors from "cors";

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
    //to suppress cors error
}).use(cors()).post(async (req, res) => {
    const { name, email, password } = req.body;
    const data = await prisma.user.findUnique({
        where : {
            email : email
        }
    });
    if(data){
        return res.json({
            status : false,
            message : "Email already exists! Try a different one."
        });
    }
    if(!data){
        const user = await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : password
            }
        });
        return res.json({
            status: true,
            message : "User created successfully!"
        })
    }
})

export default handler;
