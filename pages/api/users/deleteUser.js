import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        try {
            const {id} = req.body;
            let user = await prisma.user.delete({
                where : {
                    id : id
                }
            });
            if(user) {
                return res.json({
                    message : "User deleted successfully",
                });
            }
            else {
                return res.json({
                    message : "Error deleting user!"
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
