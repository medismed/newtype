"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../provider";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import GlobalContext, { GlobalContextType } from "../context";

export default function Header() {
  const context = useContext(GlobalContext);
  const { gUsername, setGUsername } = { ...context };
  const [username, setUsername] = useState("Loading..."); // Use a placeholder

  const router = useRouter();

  const handleLogout = async () => {
   try{
    console.log("logout")
    await logout();
    console.log("waiting logout")
    router.push("/login");
   }catch(e){
    console.log(e)
   }

  };

  useEffect(() => {
    if (gUsername) {
      setUsername(gUsername);
    } else {
      setUsername("Guest"); // Fallback if no gUsername is set
    }
  }, [gUsername]);

  return (
    <>  
      <nav className="navbar navbar-light " style={{ background: "" }}>
        <a className="navbar-brand" href="/home" style={{ color: "#73D0FF" }}>
          <FontAwesomeIcon className="ms-5 me-2 fa-1x" style={{ color: '#D7D2BC' }} icon={faKeyboard} />
          Type-Type
        </a>

        <div className="d-flex align-items-center">
          <a className="btn" href="/profile" style={{ color: "#D7D2BC" }}>
            <FontAwesomeIcon className="btn" style={{ color: '#D7D2BC' }} icon={faUser} />
            <small style={{ lineHeight: '1' }}>{`${username}`}</small>
          </a>

          {/* Wrap the logout icon with a button */}
          <button className="btn" onClick={handleLogout} style={{ background: "none", border: "none", padding: 0 }}>
            <FontAwesomeIcon className="ms-2 me-3" style={{ color: '#D7D2BC' }} icon={faRightFromBracket} />
          </button>
        </div>
      </nav>
    </>
  );
}
