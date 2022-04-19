import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

export default function Confirmation(props) {
    const { query } = useRouter();

    let src = `https://easypay.easypaisa.com.pk/easypay/Confirm.jsf?auth_token=${query.auth_token}&postBackURL=${query.postBackURL}`;
    return (
        <div>
            <iframe style={{ backgroundColor : "#fff", padding : "1rem", borderRadius : "0.5rem" }} id="easypay-iframe" name="easypay-iframe" src={src} width="100%" height="560px"/>
        </div>
    );
}

