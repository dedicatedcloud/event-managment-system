import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const { min, max } = req.body;
            const guest = await prisma.guest.create({
                data : {
                    max,
                    min
                }
            });
            prisma.$disconnect();
            if(guest){
                const data = await prisma.guest.findMany({});
                prisma.$disconnect();
                return res.json({
                    data
                });
            }
        }
        else {
            return res.json({
                message : "Not Authenticated!"
            });
        }
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
