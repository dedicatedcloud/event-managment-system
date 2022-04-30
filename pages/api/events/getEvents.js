import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const events = await prisma.events.findMany({
            include : {
                event_foods : {
                    include : {
                        food : true
                    }
                },
                event_equipment : {
                    include : {
                        equipment : true
                    }
                },
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
