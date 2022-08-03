// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = getSession({req});
    if(session){
        try {
            const { name, email, password, role } = req.body;
            const data = await prisma.user.findUnique({
                where : {
                    email : email
                }
            });
            if(data){
                return res.json({
                    message : "Email already exists! Try a different One."
                });
            }
            if(!data){
                const user = await prisma.user.create({
                    data : {
                        name : name,
                        email : email,
                        password : password,
                        role : role
                    }
                });
                return res.json({
                    message : "Account Created Successfully",
                })
            }
        }catch (e){
            return res.json({
                error : e.message
            });
        }
    }else{
        return res.json({
            message : "Not Authenticated!"
        });
    }
}
