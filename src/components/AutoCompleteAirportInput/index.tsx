import React, { Dispatch, useContext, useEffect, useState } from 'react'
import {
  Autosuggest, StatusIndicator
} from '@cloudscape-design/components'
import useAviationFetch from '../../hooks/useAviationFetch'
import { Airport } from '../../types/Airport'
import AirportContext from '../../context/AirportContext/AirportContext'

type AutoCompleteAirportInputProps = {
  airport: Airport | null,
  setAirport: Dispatch<any>,
  error: string | null,
}

const getFetchInput = (value: string) => {
  return {
    endpoint: 'suggest',
    params: [
      {
        key: 'q',
        val: value,
      }
    ],
    skip: (value.length < 3),
  }
}

const AutoCompleteAirportInput = (props: AutoCompleteAirportInputProps) => {
  const [value, setValue] = useState(props?.airport?.slug || "")
  const [options, setOptions] = useState([])

  const {airports, setAirports} = useContext(AirportContext)

  const {loading, data, error, fetchNow} = useAviationFetch(
    getFetchInput("")
  )

  useEffect(() => {
    if (value.length < 3) return
    fetchNow(getFetchInput(value))
  }, [value])

  useEffect(() => {
    if (!data) return
    parseData(data)
  }, [data])

  const parseData = (data) => {
      const newOptions = []
      const newAirports = {
        ...airports,
      }
      data.airports.forEach((airport: Airport) => {
        newAirports[airport.icao_code] = airport
        newOptions.push({
          value: airport.icao_code,
          label: airport.name,
          description: `${airport.city}, ${airport.country_code}`,
        })
      });
      setOptions(newOptions)
      setAirports(newAirports)
  }

  return (
    <>
      <Autosuggest
        onChange={({detail}) => {
          setValue(detail.value)
          if (detail.value in airports) {
            setValue(airports[detail.value]?.name)
            props.setAirport(airports[detail.value])
          }
        }}
        value={value}
        options={options}
        enteredTextLabel={value => `Use: "${value}"`}
        ariaLabel='AutoSuggest Airport Input'
        placeholder='Enter airport, city, or country'
        empty='No matches found, please enter at least 3 characters'
      />
      {props.error &&
        <StatusIndicator type='error'>{props.error}</StatusIndicator>
      }
    </>
  )
}

export default AutoCompleteAirportInput
