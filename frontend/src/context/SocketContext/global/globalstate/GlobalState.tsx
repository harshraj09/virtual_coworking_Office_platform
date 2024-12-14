import React, { createContext, ReactNode, useContext, useState } from "react";

interface IGlobalProps {
  children: ReactNode;
}

interface IGlobalStates {
  joinMembers: number;
  setJoinMembers: React.Dispatch<React.SetStateAction<number>>;
}

// Default context value
const defaultValue: IGlobalStates = {
  joinMembers: 0,
  setJoinMembers: () => {
    throw new Error("setJoinMembers is not defined. Make sure you're using GlobalContext.Provider.");
  },
};

// Create Context
export const GlobalContext = createContext<IGlobalStates>(defaultValue);

// Provider Component
const GlobalState: React.FC<IGlobalProps> = ({ children }) => {
  const [joinMembers, setJoinMembers] = useState<number>(0);
    
  return (
    <GlobalContext.Provider value={{ joinMembers, setJoinMembers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
