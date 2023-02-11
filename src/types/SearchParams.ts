import { Airline } from "./Airline";
import { Airport } from "./Airport";

export type SearchParams = {
  departureAirport: Airport,
  arrivalAirport: Airport,
  airline: Airline,
}