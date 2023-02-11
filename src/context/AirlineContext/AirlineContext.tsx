import React, { createContext } from 'react'
import { Airline } from '../../types/Airline'

type AirlineContextType = {
  airlines: {
    [key: string]: Airline
  },
  loading: boolean,
  error?: string,
}

const AirlineContext = createContext<AirlineContextType>({
  airlines: {},
  loading: true,
})

export default AirlineContext
