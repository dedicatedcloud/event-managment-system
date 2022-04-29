import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        if(session){
            const {id , eventType, guest, venue, environment, starterFood, mainFood, dessertFood, equipment, date, price} = req.body;
            let foods = starterFood.concat(mainFood, dessertFood);
            try {
                let event = prisma.events.update({
                    where: {
                        id  : id
                    },
                    data : {
                        event_type : eventType,
                        guestCountId : guest,
                        event_environment: environment,
                        venueId: venue,
                        date : date,
                        total_price : price,
                    }
                });

                //delete the data and then insert again for foods and equipment
                let event_foods_deletion = prisma.event_foods.deleteMany({
                    where: {
                        eventId: id
                    }
                });

                let event_foods_insertion = prisma.event_foods.createMany({
                    data : foods.map(food => {
                        return {
                            eventId : id,
                            foodId: food
                        }
                    })
                });

                let event_equipment_deletion = prisma.event_equipment.deleteMany({
                    where: {
                        eventId: id
                    }
                });

                let event_equipment_insertion = prisma.event_equipment.createMany({
                    data : equipment.map(equipment => {
                        return {
                            eventId : id,
                            equipmentId: equipment
                        }
                    })
                })

                let transaction = await prisma.$transaction([
                    event,
                    event_foods_deletion,
                    event_foods_insertion,
                    event_equipment_deletion,
                    event_equipment_insertion
                ]);
                console.log(transaction);
                prisma.$disconnect();
                if (transaction){
                    return res.json({
                        message : "Event Updated Successfully!",
                    })
                }
            }catch (e) {
                return res.json({
                    message : e.message,
                })
            }
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