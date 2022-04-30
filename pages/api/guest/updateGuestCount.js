import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const { id, field, value } = req.body;
            let guest =  await prisma.guest.update({
                where: {
                    id : id,
                },
                data: {
                    [field] : value,
                },
            });
            if(guest){
                return res.json({
                    message : "Guest count updated successfully!",
                });
            }
            else{
                return res.json({
                    message : "Error updating guest count!"
                });
            }
        }catch(e){
            return  res.json({
                error : e.message
            });
        }
    }
    else {
        return res.json({
            message : "Not Authenticated!"
        });
    }
}
