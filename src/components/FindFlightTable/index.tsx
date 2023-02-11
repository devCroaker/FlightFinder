import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button } from '@cloudscape-design/components'
import AirlineContext from '../../context/AirlineContext/AirlineContext'
import AirportContext from '../../context/AirportContext/AirportContext'
import useAviationFetch from '../../hooks/useAviationFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { FlightTableData } from '../../types/FlightTableData'
import { SearchParams } from '../../types/SearchParams'
import FlightTable from '../FlightTable'
import { FIND_FLIGHT_VIEW } from '../../types/Views'
import { ScheduledFlight } from '../../types/ScheduledFlight'

type FindFlightTableProps = {
  changeView: Function,
  searchParams: SearchParams,
}

const getSearchParams = (searchParams: SearchParams) => {
  const params = []
  if (searchParams.departureAirport) params.push({
    key: 'dep_icao',
    val: searchParams.departureAirport.icao_code,
  })
  if (searchParams.arrivalAirport) params.push({
    key: 'arr_icao',
    val: searchParams.arrivalAirport.icao_code,
  })
  if (searchParams.airline) params.push({
    key: 'airline_icao',
    val: searchParams.airline.icao_code,
  })
  return params
}

const FindFlightTable = (props: FindFlightTableProps) => {
  const {loading, data, error, fetchNow} = useAviationFetch({
    // There does not seem to be an endpoint that gives more future data than this one. This will do for this test application
    endpoint: 'schedules',
    params: (props.searchParams) ? getSearchParams(props.searchParams) : [],
    skip: !(props.searchParams),
  })

  useEffect(() => {
    if (!props.searchParams) return
    fetchNow({
      endpoint: 'schedules',
      params: getSearchParams(props.searchParams),
    })
  }, [props.searchParams])

  const [flights, setFlights] = useState([])
  const {airports} = useContext(AirportContext)
  const {airlines} = useContext(AirlineContext)

  useEffect(() => {
    const scheduledFlightToTableData = (flight: ScheduledFlight): FlightTableData => {
      if (!airlines[flight.airline_icao]) return
      return {
        airline_name: airlines[flight.airline_icao].name,
        airline_icao: flight.aircraft_icao,
        flight_number: flight.flight_number,
        flight_icao: flight.flight_icao,
        dep_airport_name: airports[flight.dep_icao].name,
        dep_airport_icao: flight.dep_icao,
        arr_airport_name: airports[flight.arr_icao].name,
        arr_airport_icao: flight.arr_icao,
        dep_time: new Date(flight.dep_time),
        arr_time: new Date(flight.arr_time),
        duration: flight.duration,
      }
    }

    if (!data) return
    setFlights(data.map(scheduledFlightToTableData))
  }, [data])

  const [preferences, setPreferences] = useState<{
    pageSize: number,
    visibleContent: readonly string[],
  }>({
    pageSize: 10,
    visibleContent: [
      'flight_number', 'airline_name', 'dep_airport_name',
      'dep_time', 'arr_airport_name', 'arr_time', 'duration',
    ],
  })

  const [selectedItems, setSelectedItems] = useState([])
  const [myFlights, setMyFlights] = useLocalStorage('my-ff-flights', [])
  const [alert, setAlert] = useState(null)

  const addFlights = (setSelectedItems) => {
    if (selectedItems.length < 1) {
      setAlert(
        <Alert
          dismissAriaLabel="Close alert"
          dismissible
          statusIconAriaLabel="Error"
          type="error"
          onDismiss={() => setAlert(null)}
        >
          No flight has been selected to add
        </Alert>
      )
      return
    }

    const newFlights = [
      ...myFlights,
      ...selectedItems
    ]
    setMyFlights(Array.from(new Map(newFlights.map(f => [f.flight_icao, f])).values()))
    setSelectedItems([])
    setAlert(
      <Alert
        dismissAriaLabel="Close alert"
        dismissible
        statusIconAriaLabel="Success"
        type="success"
        onDismiss={() => setAlert(null)}
        action={
          <Button
            onClick={() => props.changeView()}
          >
            My Flights
          </Button>
        }
      >
        Flight added to your flights.
      </Alert>
    )
  }

  return (
    <>
      {alert}
      <FlightTable
        view={FIND_FLIGHT_VIEW}
        data={flights}
        tableActions={(setSelectedItems) => {
            return (
              <Button
                onClick={() => addFlights(setSelectedItems)}
              >
                Add to my flights
              </Button>
            )
          }
        }
        setSelectedItems={setSelectedItems}
      />
    </>
  )
}

export default FindFlightTable
