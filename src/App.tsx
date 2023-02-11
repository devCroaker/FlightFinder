import React from 'react'
import './App.css'
import Layout from './components/Layout'
import InitializedAirlineProvider from './context/AirlineContext/InitializedAirlineProvider'
import InitializedAirportProvider from './context/AirportContext/InitializedAirportProvider'

function App() {
  return (
    <InitializedAirlineProvider>
      <InitializedAirportProvider>
        <Layout />
      </InitializedAirportProvider>
    </InitializedAirlineProvider>
  )
}

export default App
