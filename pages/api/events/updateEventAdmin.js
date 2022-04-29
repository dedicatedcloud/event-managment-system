import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session){
      let {id, field, value} = JSON.parse(req.body);
      try {
          let event = await prisma.events.update({
              where : {
                  id : parseInt(id)
              },
              data : {
                  [field] : value
              }
          });
          if(event){
              return res.json({
                  message : "Event updated successfully!"
              });
          }
      }catch (e) {
          return res.json({
              message : e.message
          });
      }
  }else{
      return res.json({
          message : "Not Authenticated!"
      })
  }
}