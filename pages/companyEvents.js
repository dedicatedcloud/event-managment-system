import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";
import {useTheme} from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function CompanyEvents(props) {

    const [companyEvents, setCompanyEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);

    const theme = useTheme();

    useEffect(() => {
        setCompanyEvents(props.ourEvents);
        setCurrentEvent(companyEvents[companyEvents.length - 1]);
    }, [companyEvents]);

    return (
        <Box component={"div"}>
            <Box component={"div"} sx={{
                height: "50rem",
                width: "100%",
                position: "relative"
            }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/CompanyEvents/${currentEvent?.picture}`} alt={""} style={{
                    width: "100%",
                    height: "100%",
                }}/>
                <Box component="div" p={3} sx={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white"
                }}>
                    <Typography variant={"h4"} sx={{
                        marginY: '1rem'
                    }}>{currentEvent?.name}</Typography>
                    <Typography variant={"h5"} sx={{
                        marginY: '1rem'
                    }}>{currentEvent?.location}</Typography>
                    <Typography variant={"body1"} sx={{
                        marginY: '1rem'
                    }}>{currentEvent?.description}</Typography>
                    <Typography variant={"body1"} sx={{
                        marginY: '1rem'
                    }}>{moment(currentEvent?.date).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "2rem"
            }}>
                <Typography variant={"h4"} align={"center"} color={"primary"}>Events</Typography>
                <Box sx={{
                    width: '35rem',
                    padding: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "1rem",
                    margin: 4
                }}>
                    {
                        companyEvents && companyEvents.reverse().map((event, i) => {
                            return (
                                <Button component="div" onClick={() => {
                                    setCurrentEvent(companyEvents[i]);
                                }} key={i} sx={{
                                    display: "flex",
                                    backgroundColor: "white",
                                    borderRadius: "1rem",
                                    margin: "1rem",
                                    justifyContent: "",
                                    padding: 0,
                                    "&:hover": {
                                        backgroundColor: theme.palette.secondary.main,
                                    },
                                    lineHeight: 0,
                                }}>
                                    <Box sx={{width: "25rem", height: "100%"}}><img src={`/CompanyEvents/${event.picture}`}
                                                                                    style={{
                                                                                        borderRadius: "1rem 0 0 1rem",
                                                                                    }} width={"100%"} height={"100%"}
                                                                                    alt={""}/></Box>
                                    <Box component="div" sx={{
                                        width: "100%",
                                        padding: 2,
                                    }}>
                                        <Typography variant={"subtitle1"} gutterBottom>{event.name}</Typography>
                                        <Typography variant={"body1"}
                                                    gutterBottom>{event.location.substring(0, 10)}...</Typography>
                                        <Typography variant={"body2"}
                                                    gutterBottom>{event.description.substring(0, 10)}...</Typography>
                                    </Box>
                                </Button>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    );
}

CompanyEvents.layout = "user";

export async function getStaticProps() {
    const res = await fetch(`${process.env.APP_URL}/api/companyEvents/getCompanyEvent`);
    const data = await res.json();
    return {
        props: {
            ourEvents: data.ourEvents
        },
        revalidate: 10
    }
}
