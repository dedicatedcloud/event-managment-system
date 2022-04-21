import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const events = await prisma.events.findFirst({
                where : {
                    userId : session.user.id
                }
            });
            if(events){
                return res.json({
                    events
                });
            }else{
                return res.json({
                    message : "Events not found!"
                });
            }
        }
        else {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }catch (e){
        return res.json({
            message : e.message
        })
    }
}
