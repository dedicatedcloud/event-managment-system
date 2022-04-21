import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const {id} = req.body;
            try {
                let admin = await prisma.user.delete({
                    where : {
                        id : id
                    }
                });
                prisma.$disconnect();
                if(admin){
                    return res.json({
                        message : "Record deleted Successfully!"
                    })
                }
            }catch (e) {
                return res.json({
                    message : e.message
                })
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
}