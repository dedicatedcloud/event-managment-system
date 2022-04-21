import prisma from '../../../lib/prisma';

require("dotenv").config();
const nodemailer = require('nodemailer');

export default async function handler(req, res){
    try {
        const { email } = req.body;
        console.log(email)
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        });
        prisma.$disconnect();
        if(user){
            //send password reset link
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.PASSWORD,
                },
            });
            const mailData = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Message From W Events&Decor`,
                text : "Please click on the link to verify your email address:\n" +
                    `http://localhost:3000/forgotPassword?email_verified=true&email=${email}`
            };
            transporter.sendMail(mailData, (err, data) => {
                if (err) {
                      return res.json({
                        status: 500,
                        message: err
                      });
                } else {
                    return res.json({
                        status: 200,
                        message: "Email sent successfully"
                    });
                }
            })
        }
        else {
            return res.json({
                message : "Email does not exist or is Incorrect!"
            })
        }
    }catch (e){
        return res.json({
            error : e.message
        })    }
}