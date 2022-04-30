import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const users = await prisma.user.findMany({
            where : {
                role : "user"
            }
        });
        return res.json({
            users
        });
    }catch (e){
        return res.json({
            error : e.message
        })
    }
}
