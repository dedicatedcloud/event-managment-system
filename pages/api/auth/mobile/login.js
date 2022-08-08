import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import AES from "crypto-js/aes";

export default async function handler(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where : {
            email : email,
        },
    });
    if(user && await bcrypt.compare(password, user.password)){
        delete user.password;
        let token = AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
        return res.json({
            token,
        });
    }
}
