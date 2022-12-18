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
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where : {
            email : email,
        },
    });
    if(user && await bcrypt.compare(password, user.password)){
        delete user.password;
        delete user.role;
        let token = AES.encrypt(JSON.stringify(user), 'mySecretKey').toString();
        return res.json({
            user,
            token,
        });
    }else{
        return res.json({
            error : "Invalid credentials!",
        });
    }
})

export default handler;
