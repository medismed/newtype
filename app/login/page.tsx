"use client"

import { FormEvent, useContext, useEffect, useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode"; // Ensure correct import
import { CustomJwtPayload, login } from "../provider";
import { getCookie } from "../lib/cookies";
import GlobalContext from "../context";

export default function Page() {
    const context = useContext(GlobalContext);
    const {gUsername,setGUsername,userId,setUserId,folder_Id,setFolder_Id} = {...context}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const data = await login(username, password);

            let decodeData = jwtDecode<CustomJwtPayload>(data['access-token']);
            console.log( decodeData)
            
            setGUsername(decodeData['sub']);
            setUserId(decodeData['userId'])
            setFolder_Id(decodeData['folderId'])

            let roles = decodeData.scope;

            if (roles.includes("user_role")) {
                router.push("/home");
            } else {
                console.log("You do not have the required role.");
            }
            


        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(()=>{
    },[])

    return (
        <form onSubmit={handleLogin}>
            <div className="lcontainer">
                <div className="lusername">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="lpassword">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="lbutton" type="submit">Login</button>
                <a className="ll" href="/register">register</a>
            </div>
        </form>
    );
}
