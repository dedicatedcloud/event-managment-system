import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const users = await prisma.user.findMany({
            where : {
                role : "user"
            }
        });
        prisma.$disconnect();
        return res.json({
            users
        });
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
