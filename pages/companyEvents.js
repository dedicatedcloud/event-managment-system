import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CompanyEvents(props) {

    const [companyEvents, setCompanyEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        setCompanyEvents(props.ourEvents);
        setCurrentEvent(companyEvents[companyEvents.length - 1]);
        }, [companyEvents]);

    return (
        <Box component={"div"}>
            <Box component={"div"} sx={{
                backgroundImage: `url('/CompanyEvents/${currentEvent?.picture}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "40rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
            }}>
                <Box component="div" p={3}>
                    <Typography variant={"h4"} sx={{
                        marginY: '1rem'
                    }}>{currentEvent?.name}</Typography>
                    <Typography variant={"h5"} sx={{
                        marginY: '1rem'
                    }}>{currentEvent?.location}</Typography>
                    <Typography variant={"body1"} sx={{
                        marginY: '1rem'
                    }}>{currentEvent?.description}</Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{
                    width: '30rem',
                    padding: 8,
                    margin: 4
                }}>
                    {
                        companyEvents.map((event, i) => {
                            return (
                                    <Box component="div" onClick={() => {
                                        setCurrentEvent(companyEvents[i]);
                                    }} key={i} sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "yellow",
                                    }}>
                                        <Box><img src={`/CompanyEvents/${event.picture}`} width={100} height={100} alt={""}/></Box>
                                        <Box component="div" >
                                            <p>{event.name}</p>
                                            <p>{event.location}</p>
                                            <p>{event.description}</p>
                                        </Box>
                                    </Box>
                                    )
                        })
                    }
                </Box>
            </Box>
        </Box>
    );
}

CompanyEvents.layout = "user";

export async function getStaticProps(){
    const res = await fetch(`${process.env.APP_URL}/api/companyEvents/getCompanyEvent`);
    const data = await res.json();
    return {
        props : {
            ourEvents : data.ourEvents
        },
        revalidate : 10
    }
}
