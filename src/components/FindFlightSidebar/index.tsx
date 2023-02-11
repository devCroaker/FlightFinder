import React, { Dispatch, useState }  from 'react'
import {
  Button,
  Container,
  ExpandableSection,
  Header,
} from '@cloudscape-design/components'
import AutoCompleteAirportInput from '../AutoCompleteAirportInput'
import { Airport } from '../../types/Airport'
import AutoCompleteAirlineInput from '../AutoCompleteAirlineInput'
import { Airline } from '../../types/Airline'

type FindFlightSidebarProps = {
  setNavOpen: Dispatch<any>,
  setSearchParams: Dispatch<any>,
}

const FindFlightSidebar = (props: FindFlightSidebarProps) => {
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null)
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null)
  const [airline, setAirline] = useState<Airline | null>(null)
  const [errors, setErrors] = useState({
    departureAirport: null,
    arrivalAirport: null,
    airline: null,
  })

  const searchFlights = () => {
    if (!validateInputs()) return
    props.setSearchParams({
      departureAirport,
      arrivalAirport,
      airline,
    })
  }

  const validateInputs = () => {
    const newErrorState = {
      departureAirport: null,
      arrivalAirport: null,
      airline: null,
    }

    if (!departureAirport) newErrorState.departureAirport = "Please select a departure airport"
    if (!arrivalAirport) newErrorState.arrivalAirport = "Please select a arrival airport"

    setErrors(newErrorState)
    return (departureAirport && arrivalAirport)
  }

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Find a flight to add to your itenerary"
        >
          Find a Flight
        </Header>
      }
    >
      
      <label>Departure Airport:</label>
      <AutoCompleteAirportInput
        airport={departureAirport}
        setAirport={setDepartureAirport}
        error={errors.departureAirport}
      />
      <br />
      <label>Arrival Airport:</label>
      <AutoCompleteAirportInput
        airport={arrivalAirport}
        setAirport={setArrivalAirport}
        error={errors.arrivalAirport}
      />
      <br />
      <ExpandableSection headerText="Optional Inputs">
        <label>Airline:</label>
        <AutoCompleteAirlineInput
          airline={airline}
          setAirline={setAirline}
          error={errors.airline}
        />
      </ExpandableSection>
      <br />
      <Button
       variant='primary'
       onClick={() => {
        searchFlights()
        props.setNavOpen(false)
      }}
      >
        Search
      </Button>
    </Container>
  )
}

export default FindFlightSidebar
