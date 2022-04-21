import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        prisma.$connect();
        const events = await prisma.events.find({
            where : {
                userId : session.user.id
            }
        });
        console.log(events, "on server");
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
