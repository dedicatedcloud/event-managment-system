import prisma from '../../../lib/prisma';
import bcrypt from "bcryptjs";

export default async function handler(req, res){

    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.update({
            where : {
                email : email
            },
            data : {
                password : hashedPassword
            }
        });
        if(user){
            res.json({
                message : 'Password changed successfully!'
            });
        }
        else {
            return res.json({
                message : "Email does not exist or is Incorrect!"
            })
        }
    }catch (e){
        return res.json({
            error : e.message
        })
    }
}