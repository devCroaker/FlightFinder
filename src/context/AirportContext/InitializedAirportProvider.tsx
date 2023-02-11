import React, { ReactNode, useState } from 'react'
import AirportContext from './AirportContext'

type InitializedAirportProviderProps = {
  children: ReactNode,
}

const InitializedAirportProvider = (props: InitializedAirportProviderProps) => {
  const [airports, setAirports] = useState({})

  return (
    <AirportContext.Provider value={{
      airports,
      setAirports,
    }}>
      {props.children}
    </AirportContext.Provider>
  )
}

export default InitializedAirportProvider
