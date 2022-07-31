import React from 'react';
import {useRouter} from "next/router";

export default function Confirmation(props) {
    const { query } = useRouter();

    let src = `https://easypay.easypaisa.com.pk/easypay/Confirm.jsf?auth_token=${query.auth_token}&postBackURL=${process.env.APP_URL}/users/transactionComplete`;
    return (
        <div>
            <iframe style={{ backgroundColor : "#fff", padding : "1rem", borderRadius : "0.5rem", border : "none" }} src={src} width="100%" height="560px"/>
        </div>
    );
}