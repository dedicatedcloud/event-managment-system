import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const ourEvents = await prisma.our_events.findMany({});
        return res.json({
            ourEvents
        });
    }catch (e){
        return res.json({
            error : e.message
        })
    }
}