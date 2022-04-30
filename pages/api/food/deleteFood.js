import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const {id} = req.body;
            let food = await prisma.food.delete({
                where : {
                    id : id
                }
            });
            if(food){
                return res.json({
                    message : "Food deleted successfully!"
                })
            }
            else{
                return res.json({
                    message : "Error deleting food!"
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
