import React, { createContext, ReactNode, useContext, useState } from 'react'

interface IGloblaProps {
    children : ReactNode
}

interface IGlobalStates {
    meetingView : boolean,
    setMeetingView : React.Dispatch<boolean>;
}

export const GlobalContext = createContext<IGlobalStates | null>(null);

export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if(!GlobalContext){
        throw new Error("No Global State Present");
    }
    return context;
}

const GlobalState:React.FC<IGloblaProps> = ({children}) => {
    const [meetingView , setMeetingView ] = useState<boolean>(false);
    
  return (
    <GlobalContext.Provider value={{meetingView , setMeetingView}}>
        {children}
    </GlobalContext.Provider>  
  )
}

export default GlobalState