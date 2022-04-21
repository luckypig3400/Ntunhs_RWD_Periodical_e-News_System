import React, { useState, useEffect } from "react";
import axios from "axios";

const config = require("../config/default.json");
const apiURL = config.apiURL;

const Signout=()=>{
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .post(`${apiURL}/auth/logout`)
            .then((response) => {
                console.log(response);
                clearAllCookie()
                window.location.href = `./`
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, []);
    return ('')
}
function clearAllCookie() {
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys){
        for(var i=keys.length;i--;){
            document.cookie=keys[i]+'=0;expires='+new Date(0).toUTCString()
        }
    }
}

export default Signout