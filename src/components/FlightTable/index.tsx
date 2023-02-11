import React, { Dispatch, ReactNode, useEffect, useState } from 'react'
import { useCollection } from '@cloudscape-design/collection-hooks'
import { Button, CollectionPreferences, Header, Pagination, Table, TextFilter } from '@cloudscape-design/components'
import { FlightFinderView, MY_FLIGHT_VIEW } from '../../types/Views'
import EmptyState from './EmptyState'
import { collectionPreferencesProps, columnDefinitions, paginationLabels, visibleContent } from './TableConfig'

type FlightTableProps = {
  view: FlightFinderView,
  data: any[],
  tableActions: Function,
  setSelectedItems: Dispatch<any>,
}

const FlightTable = (props: FlightTableProps) => {
  const [preferences, setPreferences] = useState<{
    pageSize: number,
    visibleContent: readonly string[],
  }>({
    pageSize: 10,
    visibleContent: visibleContent[props.view],
  })

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps
  } = useCollection(props.data, {
    filtering: {
      empty: (
        <EmptyState
          title="No flights"
          subtitle="No flights to display."
          action={<></>}
        />
      ),
      noMatch: (
        <EmptyState
          title="No matches"
          subtitle="We can’t find a match."
          action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize },
    sorting: {},
    selection: {},
  })
  const { selectedItems } = collectionProps
  const { setSelectedItems } = actions

  useEffect(() => {
    props.setSelectedItems(selectedItems)
  }, [selectedItems])

  return (
    <Table
      {...collectionProps}
      selectionType="multi"
      header={
        <Header
          actions={
            props.tableActions(setSelectedItems)
          }
        >
          {(props.view === MY_FLIGHT_VIEW) ?
            `My Flights (${props.data.length})` : 
            `Found Flights (${props.data.length})`
          }
        </Header>
      }
      columnDefinitions={columnDefinitions[props.view]}
      visibleColumns={preferences.visibleContent}
      items={items}
      pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} />}
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter Flights"
        />
      }
      preferences={
        <CollectionPreferences
          {...collectionPreferencesProps(props.view)}
          preferences={preferences}
          onConfirm={({detail}) => {
            console.log(detail)
            setPreferences({
              pageSize: detail.pageSize,
              visibleContent: detail.visibleContent,
            })
          }}
        />
      }
    />
  )
}

export default FlightTable
