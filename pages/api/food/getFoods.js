import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const food = await prisma.food.findMany({});
        prisma.$disconnect();
        return res.json({
            food
        });
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
