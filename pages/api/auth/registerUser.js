// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const { name, email, password } = req.body;
    const data = await prisma.user.findUnique({
      where : {
        email : email
      }
    });
    if(data){
      return res.json({
        error : "Email already exists! Try a different one."
      });
    }
    if(!data){
      const user = await prisma.user.create({
        data : {
          name : name,
          email : email,
          password : password
        }
      });
      return res.json({
        user : user,
        message : "User created successfully!"
      })
    }
  }catch (e){
    return res.json({
      error : e.message
    });
  }
}
