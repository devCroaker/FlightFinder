import { Alert, Button } from '@cloudscape-design/components'
import React, { useEffect, useState } from 'react'
import useAviationFetch from '../../hooks/useAviationFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { FlightTableData, MyFlightTableData } from '../../types/FlightTableData'
import { MY_FLIGHT_VIEW } from '../../types/Views'
import FlightTable from '../FlightTable'

const MyFlightsTable = () => {
  const [myStoredFlights, setMyStoredFlights] = useLocalStorage('my-ff-flights', [])
  const [flights, setFlights] = useState([])

  const {loading, data, error, fetchNow} = useAviationFetch({
    endpoint: 'flight',
    params: [],
    skip: true,
  })

  const enrichFlightData = (base: FlightTableData, flightInfo): MyFlightTableData => {
    const enrichedData = {
      ...base,
      arr_time: new Date((flightInfo.arr_estimated) ? flightInfo.arr_estimated : base.arr_time),
      dep_time: new Date((flightInfo.dep_estimated) ? flightInfo.dep_estimated : base.dep_time),
      dep_gate: flightInfo.dep_gate || '',
      arr_gate: flightInfo.arr_gate || '',
      arr_baggage: flightInfo.arr_baggage || '',
      status: flightInfo.status,
      delayed: flightInfo.delayed || 0,
    }
    if (flightInfo.dep_estimated) enrichedData.dep_time = new Date(flightInfo.dep_estimated)
    if (flightInfo.arr_estimated) enrichedData.arr_time = new Date(flightInfo.arr_estimated)

    return enrichedData
  }

  const refreshFlightStatuses = () => {
    const flightData = myStoredFlights.map(async (flight) => {
      const flightInfo = await fetchNow({
        endpoint: 'flight',
        params: [{
          key: 'flight_icao',
          val: flight.flight_icao,
        }],
      })
      return (flightInfo !== 'Flight not found') ?
        enrichFlightData(flight, flightInfo) :
        enrichFlightData(flight, {status: 'Flight not found'})
    })
    Promise.all(flightData).then(results => {
      setFlights(results)
    })
  }

  useEffect(() => {
    refreshFlightStatuses()
  }, [myStoredFlights])

  const [selectedItems, setSelectedItems] = useState([])
  const [alert, setAlert] = useState(null)

  const removeFlight = (setSelectedItems) => {
    if (selectedItems.length < 1) {
      setAlert(
        <Alert
          dismissAriaLabel="Close alert"
          dismissible
          statusIconAriaLabel="Error"
          type="error"
          onDismiss={() => setAlert(null)}
        >
          No flights have been selected to remove
        </Alert>
      )
      return
    }

    const selectedIcaos = selectedItems.map(f => f.flight_icao)
    const newFlights = myStoredFlights.filter(f => !(selectedIcaos.includes(f.flight_icao)))
    setMyStoredFlights(newFlights)
    setSelectedItems([])
    
    setAlert(
      <Alert
        dismissAriaLabel="Close alert"
        dismissible
        statusIconAriaLabel="Success"
        type="success"
        onDismiss={() => setAlert(null)}
      >
        Flights removed from your flights.
      </Alert>
    )
  }

  return (
    <>
      {alert}
      <FlightTable
        view={MY_FLIGHT_VIEW}
        data={flights}
        tableActions={(setSelectedItems) => {
          return (
            <>
              <Button
                onClick={() => removeFlight(setSelectedItems)}
              >
                Remove flight
              </Button>
              <Button
                iconName="refresh"
                variant="icon"
                onClick={() => refreshFlightStatuses()}
              />
            </>
          )
        }}
        setSelectedItems={setSelectedItems}
      />
    </>
  )
}

export default MyFlightsTable
