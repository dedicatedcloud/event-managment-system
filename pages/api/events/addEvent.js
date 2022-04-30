import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if(session){
        const { event, totalPrice, phoneNumber, email, advancePayment } = JSON.parse(req.body);
        const userId = session.user.id;
        let foods = event.starterFood.concat(event.mainFood, event.dessertFood);
        //Todo : change this insert to add related ata using create
        const _event = await prisma.events.create({
            data : {
                event_type: event.eventType,
                guestCountId : event.guest,
                event_environment : event.environment,
                venueId : event.venue,
                userId,
                phone_number : phoneNumber,
                date : event.date,
                total_price : totalPrice,
                advance_payment : advancePayment,
                payment_status : "pending",
                event_status : "pending",
            }
        });
        prisma.$disconnect();
        if(_event){
            let food = "";
            for(let i = 0; i < foods.length; i++){
                for(let j = 0; j < foods[i].length; j++){
                    food = await prisma.event_foods.create({
                        data : {
                            eventId : _event.id,
                            foodId : foods[i][j]
                        }
                    });
                }
            }
            prisma.$disconnect();
            let equipment = "";
            for(let i = 0; i < event.equipment.length; i++){
                equipment = await prisma.event_equipment.create({
                    data : {
                        eventId : _event.id,
                        equipmentId : event.equipment[i],
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