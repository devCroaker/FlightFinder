import React, { useState } from 'react'
import {
  AppLayout,
  Container,
  Header,
  SpaceBetween,
  TopNavigation,
} from '@cloudscape-design/components'

import FindFlightSidebar from '../FindFlightSidebar'
import FindFlightTable from '../FindFlightTable'
import { SearchParams } from '../../types/SearchParams'
import MyFlightsTable from '../MyFlightsTable'
import { FIND_FLIGHT_VIEW, MY_FLIGHT_VIEW } from '../../types/Views'

const Layout = () => {
  const [view, setView] = useState(FIND_FLIGHT_VIEW)
  const [navOpen, setNavOpen] = useState(true)

  const [searchParams, setSearchParams] = useState<SearchParams | null>()

  return (
    <>
      <div id='ff-header'>
        <TopNavigation
          identity={{
            href: '#',
            title: 'Flight Finder',
            logo: {
              src: 'https://img.favpng.com/18/0/19/airplane-aircraft-flight-logo-clip-art-png-favpng-M8M71krEYp94R9D3ptJRwGczQ.jpg',
              alt: 'Flight Finder',
            }
          }}
          utilities={[
            {
              type: 'button',
              text: 'Add a Flight',
              onClick: () => {setView(FIND_FLIGHT_VIEW)},
            },
            {
              type: 'button',
              text: 'My Flights',
              onClick: () => {setView(MY_FLIGHT_VIEW)},
            },
          ]}
          i18nStrings={{
            searchIconAriaLabel: "Search",
            searchDismissIconAriaLabel: "Close search",
            overflowMenuTriggerText: "More",
            overflowMenuTitleText: "All",
            overflowMenuBackIconAriaLabel: "Back",
            overflowMenuDismissIconAriaLabel: "Close menu"
          }}
        />
      </div>
      <AppLayout
        headerSelector='#ff-header'
        content={(view === MY_FLIGHT_VIEW) ?
          <MyFlightsTable />
          :
          <FindFlightTable
            changeView={() => setView(MY_FLIGHT_VIEW)}
            searchParams={searchParams}
          />
        }

        navigationOpen={navOpen}
        navigationHide={(view === MY_FLIGHT_VIEW)}
        navigationWidth={350}
        navigation={(view === MY_FLIGHT_VIEW) ?
          <div>My Flights Nav</div>
          :
          <FindFlightSidebar
            setNavOpen={setNavOpen}
            setSearchParams={setSearchParams}
          />
        }
        onNavigationChange={({detail}) => setNavOpen(detail.open)}

        toolsWidth={300}
        tools={(view === MY_FLIGHT_VIEW) ?
          <Container
            header={
              <SpaceBetween size='m'>
                <Header
                  variant='h2'
                  description="Helpfull links and info on the pages use"
                >
                  My Flights
                </Header>
              </SpaceBetween>
            }
          >
            <span>
              Here we can put all kinds of helpfull links and information on the use of the page.
            </span>
            <br />
            <br />
            <span>
              To remove one or more of your flights, select the row in the table and click the 'Remove Flight' button.
            </span>
            <br />
            <br />
            <span>
              To get the most recent flight information, select the row in the table and click the refresh button.
            </span>
          </Container>
          :
          <Container
            header={
              <SpaceBetween size='m'>
                <Header
                  variant='h2'
                  description="Helpfull links and info on the pages use"
                >
                  Find Flights
                </Header>
              </SpaceBetween>
            }
          >
            <span>
              Here we can put all kinds of helpfull links and information on the use of the page.
            </span>
            <br />
            <br />
            <span>
              To find a flight open up the nav bar on the left side of the page and input the departure and arrival airports. You may also choose to add a specific airline to your search.
            </span>
            <br />
            <br />
            <span>
              To add a flight to your flights for tracking, select one or more flight's rows from the table and click the 'Add to my flights' button.
            </span>
          </Container>
        }
      />
    </>
  )
}

export default Layout
