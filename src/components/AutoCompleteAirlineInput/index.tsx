import React, { Dispatch, useContext, useEffect, useState } from 'react'
import {
  Autosuggest, StatusIndicator
} from '@cloudscape-design/components'
import { Airline } from '../../types/Airline'
import AirlineContext from '../../context/AirlineContext/AirlineContext'

type AutoCompleteAirlineInputProps = {
  airline: Airline | null,
  setAirline: Dispatch<any>,
  error: string | null,
}

const AutoCompleteAirlineInput = (props: AutoCompleteAirlineInputProps) => {
  const [value, setValue] = useState(props?.airline?.name || "")
  const [options, setOptions] = useState([])

  const {airlines} = useContext(AirlineContext)

  useEffect(() => {
    if (!airlines) return
    parseData(airlines)
  }, [airlines])

  const parseData = (data) => {
      const newOptions = []
      const newAirlines = {}
      Object.values(data).forEach((airline: Airline) => {
        if (airline.is_passenger !== 1) return 
        newAirlines[airline.slug] = airline
        newOptions.push({
          value: airline.icao_code,
          label: airline.name,
          description: airline.icao_code,
        })
      });
      newOptions.sort((a,b) => (a.label > b.label) ? 1 : (b.label > a.label) ? -1 : 0)
      setOptions(newOptions)
  }

  return (
    <>
      <Autosuggest
        onChange={({detail}) => {
          setValue(detail.value)
          if (detail.value in airlines) {
            setValue(airlines[detail.value]?.name)
            props.setAirline(airlines[detail.value])
          }
        }}
        value={value}
        options={options}
        enteredTextLabel={value => `Use: "${value}"`}
        ariaLabel='AutoSuggest Airline Input'
        placeholder='Enter select an airline'
        empty='No matches found'
      />
      {props.error &&
        <StatusIndicator type='error'>{props.error}</StatusIndicator>
      }
    </>
  )
}

export default AutoCompleteAirlineInput
