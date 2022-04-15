import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const {id} = req.body;
                try {
                    id.map(async (id) => {
                        let guest = await prisma.guest.delete({
                            where : {
                                id : id
                            }
                        });
                    })
                }catch (e) {
                    return res.json({
                        message : e.message
                    })
                }
            return res.json({
                message : "Record deleted Successfully!"
            })
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
