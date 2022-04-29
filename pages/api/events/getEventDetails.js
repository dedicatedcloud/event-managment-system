import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        const events = await prisma.events.findMany({
            where : {
                id : parseInt(req.body)
            },
            include : {
                event_foods : true,
                event_equipment : true,
            }
        });
        console.log(events);
        prisma.$disconnect();
        return res.json({
            events
        });
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
