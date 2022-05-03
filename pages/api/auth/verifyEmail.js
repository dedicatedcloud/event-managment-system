import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';
import logo from "../../../public/assets/logo.png";

require("dotenv").config();

export default async function handler(req, res){
    try {
        const { email } = req.body;
        console.log(email)
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        });
        if(user){
            //send password reset link
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const mailData = {
                from: process.env.EMAIL,
                to: email,
                subject: `Message From W Events&Decor`,
                html : `<p style='color: #f08a5d;'>Please click on the button below to verify your email address:</p><br/><a href='http://localhost:3000/forgotPassword?email_verified=true&email=${user.email}'><button style="padding : 0.5rem; border-radius : 0.5rem; border : none; outline : none;">Verify Email</button</a>`
            };
            await transporter.sendMail(mailData, (err, data) => {
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