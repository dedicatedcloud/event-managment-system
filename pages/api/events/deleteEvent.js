import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            try {
                const {id} = req.body;
                let event_foods = prisma.event_foods.deleteMany({
                    where: {
                        eventId: id
                    }
                });
                let event_equipment = prisma.event_equipment.deleteMany({
                    where: {
                        eventId: id
                    }
                });
                let event = prisma.events.delete({
                    where : {
                        id
                    }
                });
                let transaction = await prisma.$transaction([
                    event_foods,
                    event_equipment,
                    event
                ]);
                if (await transaction.length > 0){
                    return res.json({
                        message : "Event deleted Successfully!",
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
            error : e.message
        })
    }
}