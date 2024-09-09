import { sidebarMenuItems } from "./Interfaces";

const minPassLength = 6;
const BACKEND_URI = "http://localhost:4000";
const otpLength = 4;
const otpGap = 60;
const accessTokenExpiration = 60 * 60 * 24 * 100; // 7 days
const refreshTokenExpiration = 60 * 60 * 24 * 200; // 30 days

const sidebarMenu:Array<sidebarMenuItems>= [
    {
        name: "Home",
        path: "home",
        iconS: "../icons/doc.png",
        iconNS: "../icons/doc.ns.png",
    },
    {
        name: "Statistics",
        path: "stats",
        iconS: "../icons/statistics.png",
        iconNS: "../icons/stats.ns.png",
    },
]

export { 
    BACKEND_URI,
    minPassLength,
    otpLength,
    otpGap,
    sidebarMenu,
    accessTokenExpiration,
    refreshTokenExpiration
};