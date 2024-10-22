"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

export interface GlobalContextType {
  gUsername: string;
  setGUsername: any;
  userId: number | null;
  setUserId: any;
  folder_Id: number | null;
  setFolder_Id: any;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [gUsername, setGUsername] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("gUsername") || "";
    }
    return ""; // Default value when window is undefined
  });

  const [userId, setUserId] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem("userId");
      return id ? parseInt(id, 10) : null;
    }
    return null; // Default value when window is undefined
  });

  const [folder_Id, setFolder_Id] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const folderId = localStorage.getItem("folder_Id");
      return folderId ? parseInt(folderId, 10) : null;
    }
    return null; // Default value when window is undefined
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("gUsername", gUsername);
    }
  }, [gUsername]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userId !== null) {
        localStorage.setItem("userId", userId.toString());
      } else {
        localStorage.removeItem("userId");
      }
    }
  }, [userId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (folder_Id !== null) {
        localStorage.setItem("folder_Id", folder_Id.toString());
      } else {
        localStorage.removeItem("folder_Id");
      }
    }
  }, [folder_Id]);

  return (
    <GlobalContext.Provider
      value={{ gUsername, setGUsername, userId, setUserId, folder_Id, setFolder_Id }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
