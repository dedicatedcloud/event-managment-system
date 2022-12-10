import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    const session = undefined /*await getSession({ req })*/;
    if(session !== undefined || req.body?.token !== undefined) {
        try {
            const { event, phoneNumber, email, advancePayment } = JSON.parse(req.body);
            console.log(event);
            const userId = session.user.id || event.userId;

            // combine the arrays into a single array
            let foods = event.menu1Food.concat(event.menu2Food, event.menu3Food);


            let food = foods.map((f) => ({
                foodId : f
            }));

            let equipment = event.equipment.map((e) => ({
                equipmentId : e
            }));

            const _event = await prisma.events.create({
                data : {
                    event_type: event.eventType,
                    guestCountId : event.guest,
                    event_environment : event.environment,
                    venueId : event.venue,
                    userId,
                    phone_number : phoneNumber,
                    date : event.date,
                    total_price : event.totalPrice,
                    advance_payment : advancePayment,
                    payment_status : "pending",
                    event_status : "pending",
                    event_foods : {
                        create : food
                    },
                    event_equipment : {
                        create : equipment
                    },
                }
            });
            if(await _event){
                return res.json({
                    message : "Event created successfully",
                });
            } else{
                return res.json({
                    message : "Event creation failed!",
                });
            }
        } catch (e) {
            return res.json({
                error : e.message
            });
        }
    } else {
        return res.json({
            message : "Not Authenticated!"
        });
    }
}
