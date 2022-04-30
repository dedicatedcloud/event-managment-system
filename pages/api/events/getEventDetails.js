import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    try {
        const events = await prisma.events.findMany({
            where : {
                id : parseInt(req.body)
            },
            include : {
                event_foods : true,
                event_equipment : true,
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
