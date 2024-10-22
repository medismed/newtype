"use server"

import { cookies } from "next/headers";

export const createJwtCookie = async (name:string,value:any) => {
    cookies().set(name,value,{
        maxAge:((60 *  60  * 24 * 10)-10),
    });
}

export const getCookie = async (name : string) => { 
    if (cookies().get(name))
        return cookies().get(name)?.value;
}

export const deleteCookie = async (name : string) => {
    cookies().delete(name);
}
