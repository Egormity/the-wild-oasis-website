'use client';

import { createContext, useContext, useState } from 'react';

const ReservarionContext = createContext();

const initialState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservarionContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservarionContext.Provider>
  );
}

function useReservationContext() {
  const context = useContext(ReservarionContext);
  if (context === undefined) throw new Error('ReservationContext was used outside of ReservationProvider');
  return context;
}

export { ReservationProvider, useReservationContext };
