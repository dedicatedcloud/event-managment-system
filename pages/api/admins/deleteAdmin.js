import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
        const session = await getSession({ req });
        if(session){
            try {
                const {id} = req.body;
                let admin = await prisma.user.delete({
                    where : {
                        id : id
                    }
                });
                if(admin){
                    return res.json({
                        message : "Account deleted Successfully!"
                    })
                }
            }catch (e) {
                return res.json({
                    error : e.message
                })
            }
        }
        else {
            return res.json({
                message : "Not Authenticated!"
            });
        }
}