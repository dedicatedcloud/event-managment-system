import React, {useEffect, useState} from 'react';

export default function CompanyEvents(props) {

    const [companyEvents, setCompanyEvents] = useState([]);

    useEffect(() => {
        setCompanyEvents(props.ourEvents);
    }, []);


    return (
        <>
            <h1>Company Events</h1>
            {
                companyEvents.map((event, i) => {
                    return (
                        <div key={i}>
                            <img src={`/CompanyEvents/${event.picture}`} width={100} height={100} alt={""}/>
                            <p>{event.name}</p>
                            <p>{event.location}</p>
                            <p>{event.description}</p>
                        </div>
                    )
                })
            }
        </>
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
