import React from 'react';

export default function CompanyEvents(props) {
    return (
        <>
            <h1>Company Events</h1>
        </>
    );
}

CompanyEvents.layout = "user";

/*
export async function getStaticProps(){
    const res = await fetch(`${process.env.APP_URL}/api/food/getFoods`);
    const data = await res.json();
    return {
        props : {
            foods : data.food
        },
        revalidate : 10
    }
}*/
