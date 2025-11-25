'use client'
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initState = { from: undefined, to: undefined };

const ReservationProvider = ({ children }) => {
    const [range, setRange] = useState(initState);
    const resetRange = () => setRange(initState);

    return <ReservationContext.Provider value={{ range, setRange, resetRange }}>
        {children}
    </ReservationContext.Provider>
}

const useReservation = () => {
    const context = useContext(ReservationContext);
    if (context === undefined) throw new Error('context used outside provider')
    return context;
}

export { useReservation, ReservationProvider };