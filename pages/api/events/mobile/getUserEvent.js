import prisma from '../../../../lib/prisma';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const {token, userId} = JSON.parse(req.body);
    if(token){
        try {
            const events = await prisma.events.findMany({
                where : {
                    userId : parseInt(userId)
                },
                include : {
                    event_foods : true,
                    event_equipment : true
                }
            });
            return res.json({
                events
            });
        }catch (e){
            return res.json({
                error : e.message
            })
        }
    }
    else{
        return res.json({
            error : 'Not Authenticated!'
        })
    }
}
