import React from 'react'
import { FlightTableData, MyFlightTableData } from '../../types/FlightTableData'
import { FIND_FLIGHT_VIEW, FlightFinderView, MY_FLIGHT_VIEW } from '../../types/Views';

const createLabelFunction = (columnName) => {
  return ({ sorted, descending }) => {
    const sortState = sorted ? `sorted ${descending ? 'descending' : 'ascending'}` : 'not sorted';
    return `${columnName}, ${sortState}.`;
  }
}

const getDuration = (time) => {
  const days = Math.floor(time/24/60)
  const hours = Math.floor(time/60%24)
  const minutes = time%60
  return `${(days > 0) ? days + 'd ' : ''} ${(hours > 0) ? hours + 'h ' : ''} ${minutes}m`
}

const basicColumnDefinitions = [
  {
    id: 'flight_number',
    header: 'Flight',
    cell: (item: FlightTableData) => item.flight_number,
    ariaLabel: createLabelFunction('flight_number'),
    sortingField: 'flight_number',
  },
  {
    id: 'airline_name',
    header: 'Airline',
    cell: (item: FlightTableData) => item.airline_name,
    ariaLabel: createLabelFunction('airline_name'),
    sortingField: 'airline_name',
  },
  {
    id: 'dep_airport_name',
    header: 'Departure Airport',
    cell: (item: FlightTableData) => item.dep_airport_name,
    ariaLabel: createLabelFunction('dep_airport_name'),
    sortingField: 'dep_airport_name',
  },
  {
    id: 'dep_time',
    header: 'Departure Time',
    cell: (item: FlightTableData) => item.dep_time.toLocaleDateString() + ' ' + item.dep_time.toLocaleTimeString(),
    ariaLabel: createLabelFunction('dep_time'),
    sortingField: 'dep_time',
  },
  {
    id: 'arr_airport_name',
    header: 'Arrival Airport',
    cell: (item: FlightTableData) => item.arr_airport_name,
    ariaLabel: createLabelFunction('arr_airport_name'),
    sortingField: 'arr_airport_name',
  },
  {
    id: 'arr_time',
    header: 'Arrival Time',
    cell: (item: FlightTableData) => item.arr_time.toLocaleTimeString() + ' ' + item.arr_time.toLocaleTimeString(),
    ariaLabel: createLabelFunction('arr_time'),
    sortingField: 'arr_time',
  },
  {
    id: 'duration',
    header: 'Total Duration',
    cell: (item: FlightTableData) => getDuration(item.duration),
    ariaLabel: createLabelFunction('duration'),
    sortingField: 'duration',
  },
]

export const columnDefinitions = {
  [FIND_FLIGHT_VIEW]: basicColumnDefinitions,
  [MY_FLIGHT_VIEW]: [
    {
      id: 'status',
      header: 'Status',
      cell: (item: MyFlightTableData) => item.status.charAt(0).toUpperCase() + item.status.slice(1),
      ariaLabel: createLabelFunction('status'),
      sortingField: 'status',
    },
    basicColumnDefinitions[0],
    basicColumnDefinitions[1],
    basicColumnDefinitions[2],
    basicColumnDefinitions[3],
    {
      id: 'dep_gate',
      header: 'Departure Gate',
      cell: (item: MyFlightTableData) => item.dep_gate,
      ariaLabel: createLabelFunction('dep_gate'),
      sortingField: 'dep_gate',
    },
    basicColumnDefinitions[4],
    basicColumnDefinitions[5],
    {
      id: 'arr_gate',
      header: 'Arrival Gate',
      cell: (item: MyFlightTableData) => item.arr_gate,
      ariaLabel: createLabelFunction('arr_gate'),
      sortingField: 'arr_gate',
    },
    {
      id: 'arr_baggage',
      header: 'Baggage Carousel',
      cell: (item: MyFlightTableData) => item.arr_baggage,
      ariaLabel: createLabelFunction('arr_baggage'),
      sortingField: 'arr_baggage',
    },
    basicColumnDefinitions[6],
    {
      id: 'delayed',
      header: 'Delayed Duration',
      cell: (item: MyFlightTableData) => getDuration(item.delayed),
      ariaLabel: createLabelFunction('delayed'),
      sortingField: 'delayed',
    },
  ]
}

const baseVisibleContent = [
  'flight_number', 'airline_name', 'dep_airport_name',
  'dep_time', 'arr_airport_name', 'arr_time', 'duration',
]

export const visibleContent = {
  [FIND_FLIGHT_VIEW]: baseVisibleContent,
  [MY_FLIGHT_VIEW]: [
    'status', 'delayed', 'dep_gate', 'arr_gate', 'arr_baggage',
    ...baseVisibleContent,
  ],
}

export const paginationLabels = {
  nextPageLabel: 'Next page',
  pageLabel: pageNumber => `Go to page ${pageNumber}`,
  previousPageLabel: 'Previous page',
}

const pageSizePreference = {
  title: 'Select page size',
  options: [
    { value: 10, label: '10 flights' },
    { value: 25, label: '20 flights' },
    { value: 50, label: '50 flights' },
    { value: 100, label: '100 flights' },
  ],
}

const visibleContentPreference = (view: FlightFinderView) => {
  return {
    title: 'Select visible content',
    options: [
      {
        label: 'Main properties',
        options: columnDefinitions[view].map(({ id, header }) => ({ id, label: header, editable: id !== 'id' })),
      },
    ],
  }
}

export const collectionPreferencesProps = (view: FlightFinderView) => {
  return {
    pageSizePreference,
    visibleContentPreference: visibleContentPreference(view),
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    title: 'Preferences',
  }
}
