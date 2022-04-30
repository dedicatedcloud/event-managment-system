import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const { min, max } = req.body;
            const guest = await prisma.guest.create({
                data : {
                    max,
                    min
                }
            });
            if(guest){
                return res.json({
                    message : "Guest Count inserted successfully!",
                });
            }
            else{
                return res.json({
                    message : "Guest Count not inserted!",
                });
            }
        }catch (e) {
            return res.json({
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
