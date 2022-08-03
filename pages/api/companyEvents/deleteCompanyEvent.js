import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const {id} = req.body;
            let venue = await prisma.companyEvents.delete({
                where : {
                    id : id
                }
            });
            if(venue){
                return res.json({
                    message : "Event deleted successfully!"
                })
            }else {
                return res.json({
                    message : "Error deleting Event!"
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
