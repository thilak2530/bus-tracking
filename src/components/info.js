import { Link } from "react-router-dom"

export const info=[
    {
        listname:"Home",
        img: `${process.env.PUBLIC_URL}/homeimg/home_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`,
        
        
    },
    {
        listname:"Pass",
        img:`${process.env.PUBLIC_URL}/homeimg/badge_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`
    },
    {
        listname:"Wallet",
        img:`${process.env.PUBLIC_URL}/homeimg/wallet_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`
    },
    {
        listname:"Settings",
        img:`${process.env.PUBLIC_URL}/homeimg/settings_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`
    },
    {
        listname:"Login",
        img:`${process.env.PUBLIC_URL}/homeimg/login_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`
    },
    {
        listname:"Logout",
        img:`${process.env.PUBLIC_URL}/homeimg/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`
    }
]

export const otherbusinfo =[
    {
        img:`${process.env.PUBLIC_URL}/homeimg/bus5.png`,
        no:"1"
    },
    {
        img:`${process.env.PUBLIC_URL}/homeimg/busimg.png`,
        no:"2"
    },
    {
        img:`${process.env.PUBLIC_URL}/homeimg/busimg.png`,
        no:"3"
    },
    {
        img:`${process.env.PUBLIC_URL}/homeimg/busimg.png`,
        no:"4"
    },
    {
        img:`${process.env.PUBLIC_URL}/homeimg/bus5.png`,
        no:"5"
    },
    {
        img:`${process.env.PUBLIC_URL}/homeimg/bus5.png`,
        no:"6"
    },
    
]


import { useEffect, useState } from "react";

export function useBusTimings() {
  const [busTimings, setBusTimings] = useState([]);

 useEffect(() => {
  fetch(`${process.env.REACT_APP_BASE_URL}/get-bus-timings`)
    .then((res) => res.json())
    .then((data) => {
      setBusTimings(data);
    })
    .catch((err) => console.error("Failed to load timings", err));
}, []);

  return busTimings;
}