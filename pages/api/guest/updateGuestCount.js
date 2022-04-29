import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const { id, field, value } = req.body;
            let guest;
            try {
                guest = await prisma.guest.update({
                    where: {
                        id : id,
                    },
                    data: {
                        [field] : value,
                    },
                });
                prisma.$disconnect();
            }catch(e){
                return  res.json({
                    message : e.message
                });
            }
            return res.json({
                message : "Record Updated Successfully!"

            });
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
