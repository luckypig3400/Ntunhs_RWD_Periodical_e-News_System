import React, { useState, useEffect } from "react";
import axios from "axios";

const config = require("../config/default.json");
const apiURL = config.apiURL;

const AuthVerify=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .post(`${apiURL}/auth/verify`)
            .then((response) => {
                console.log(response);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.log(error.response);
                window.location.href = `/`
            });
    }, []);
    console.log(isLoggedIn);
}

export default AuthVerify;
