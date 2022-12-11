import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
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
