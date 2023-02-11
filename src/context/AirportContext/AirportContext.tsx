import React, { createContext, Dispatch } from 'react'
import { Airport } from '../../types/Airport'

type AirportContextType = {
  airports: {
    [key: string]: Airport
  },
  setAirports?: Dispatch<any>,
}

const AirportContext = createContext<AirportContextType>({
  airports: {},
})

export default AirportContext
