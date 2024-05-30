"use client";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserProfile {
  username: string;
  id: string;
  email?: string;
}

export const UserContext = createContext<UserProfile>({
  username: "",
  id: "",
  email: "",
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserProfile>({
    username: "",
    id: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/getUserDetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserDetails({
          username: data.userDetails.username,
          id: data.userDetails.id,
          email: data.userDetails?.email || "",
        });
      } catch (error) {
        console.log("hey");
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);


  // console.log(userDetails);

  return (
    <UserContext.Provider value={userDetails}>{children}</UserContext.Provider>
  );
};

export default GlobalContextProvider;
