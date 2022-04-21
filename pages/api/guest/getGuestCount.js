import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    try {
        const guests = await prisma.guest.findMany({
            include: {
                venues : true
            }
        });
        prisma.$disconnect();
        return res.json({
            guests
        });
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
