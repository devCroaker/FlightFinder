import React, { ReactNode, useEffect, useState } from 'react'
import useAviationFetch from '../../hooks/useAviationFetch'
import AirlineContext from './AirlineContext'

type InitializedAirlineProviderProps = {
  children: ReactNode,
}

const InitializedAirlineProvider = (props: InitializedAirlineProviderProps) => {
  const [airlines, setAirlines] = useState({})

  const {loading, data, error, fetchNow} = useAviationFetch({
    endpoint: 'airlines',
    params: [],
  })

  useEffect(() => {
    if (!data) return
    parseData(data)
  }, [data])

  const parseData = (data) => {
      const newAirlines = {}
      data.forEach(airline => {
        if (airline.is_passenger !== 1) return 
        newAirlines[airline.icao_code] = airline
      })
      setAirlines(newAirlines)
  }

  return (
    <AirlineContext.Provider value={{
      airlines,
      loading,
      error,
    }}>
      {props.children}
    </AirlineContext.Provider>
  )
}

export default InitializedAirlineProvider
