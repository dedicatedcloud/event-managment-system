import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        const { eventType, guest, venue, environment, starterFood, mainFood,dessertFood, equipment : equipments, date, totalPrice, phoneNumber, email, advancePayment } = JSON.parse(req.body);
        const userId = session.user.id;
        let foods = [];
        foods.push(starterFood);
        foods.push(mainFood);
        foods.push(dessertFood);
        const event = await prisma.events.create({
            data : {
                event_type: eventType,
                guestCountId : guest,
                event_environment : environment,
                venueId : venue,
                userId,
                phone_number : phoneNumber,
                date,
                total_price : totalPrice,
                advance_payment : advancePayment,
                payment_status : "pending",
                event_status : "pending",
            }
        });
        prisma.$disconnect();
        // TODO: add foods
        console.log(event);
        if(event){
            let food = "";
            for(let i = 0; i < foods.length; i++){
                for(let j = 0; j < foods[i].length; j++){
                    food = await prisma.event_foods.create({
                        data : {
                            eventId : event.id,
                            foodId : foods[i][j]
                        }
                    });
                }
            }
            prisma.$disconnect();
            let equipment = "";
            for(let i = 0; i < equipments.length; i++){
                equipment = await prisma.event_equipment.create({
                    data : {
                        eventId : event.id,
                        equipmentId : equipments[i],
                    }
                });
            }
            prisma.$disconnect();
            if(food && equipment){
                res.json({
                    message : "Event created successfully",
                });
            }
        } else{
            res.json({
                message : "Event creation failed",
            });
        }
    } else {
        return res.json({
            message : "Not Authenticated!"
        });
    }
}