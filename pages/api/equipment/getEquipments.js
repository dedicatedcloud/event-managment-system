import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const equipment = await prisma.equipment.findMany({});
        prisma.$disconnect();
        return res.json({
            equipment
        });
    }catch (e){
        return res.json({
            error : e.message
        })
    }
}
