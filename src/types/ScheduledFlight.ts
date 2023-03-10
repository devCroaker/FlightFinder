export type ScheduledFlight = {
  aircraft_icao: string,
  airline_iata: string,
  airline_icao: string,
  arr_baggage: string,
  arr_delayed: number,
  arr_estimated: string,
  arr_estimated_ts: number,
  arr_estimated_utc: string,
  arr_gate: string,
  arr_iata: string,
  arr_icao: string,
  arr_terminal: string,
  arr_time: string,
  arr_time_ts: string,
  arr_time_utc: string,
  cs_airline_iata?: any,
  cs_flight_iata?: any,
  cs_flight_number?: any,
  delayed: number,
  dep_actual: string,
  dep_actual_ts: number,
  dep_actual_utc: string,
  dep_delayed: number,
  dep_estimated: string,
  dep_estimated_ts: string,
  dep_estimated_utc: string,
  dep_gate: string,
  dep_iata: string,
  dep_icao: string,
  dep_terminal?: string,
  dep_time: string,
  dep_time_ts: number,
  dep_time_utc: string,
  duration: number,
  flight_iata: string,
  flight_icao: string,
  flight_number: string,
  status: string,
}
