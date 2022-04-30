import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const {id} = req.body;
            let guest = await prisma.guest.delete({
                where : {
                    id : id
                }
            });
            if(guest){
                return res.json({
                    message : "Guest count deleted successfully!",
                });
            }
            else{
                return res.json({
                    message : "Error deleting guest count!"
                });
            }
        }catch (e) {
            return res.json({
                message : e.message
            })
        }
    }
    else {
        return res.json({
            message : "Not Authenticated!"
        });
    }
}
