import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const equipment = await prisma.equipment.findMany({});
        return res.json({
            equipment
        });
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
