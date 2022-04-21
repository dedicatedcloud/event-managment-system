import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const {id} = req.body;
            try {
                let event = await prisma.events.delete({
                    where : {
                        id
                    }
                });
                prisma.$disconnect();
                if (event){
                    return res.json({
                        message : "Event deleted Successfully!"
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