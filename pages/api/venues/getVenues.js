import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const venues = await prisma.venues.findMany({
            include : {
                guest : true
            }
        });
        return res.json({
            venues
        });
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
