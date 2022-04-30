import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session){
      try {
          let {id, field, value} = JSON.parse(req.body);
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
          }else{
              return res.json({
                  message : "Event not updated!"
              });
          }
      }catch (e) {
          return res.json({
              error : e.message
          });
      }
  }else{
      return res.json({
          message : "Not Authenticated!"
      })
  }
}