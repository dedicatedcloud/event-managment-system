import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const {id} = req.body;
            let equipment = await prisma.equipment.delete({
                where: {
                    id: id
                }
            })
            if(equipment){
                return res.json({
                    message : "Equipment deleted successfully!"
                })
            }
            else{
                return res.json({
                    message : "Error deleting equipment!"
                })
            }
        }catch (e) {
            return res.json({
                error : e.message
            })
        }
    }
    else {
        return res.json({
            message : "Not Authenticated!"
        });
    }
}
