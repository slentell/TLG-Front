import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'



const Calendar = () => {

  const [events, setEvents] = useState([])

  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  const getTeamEvents = () => {
    console.log('events')
  }

  const bullshitEvents = [
    {id:1,
    title: 'Some bullshit',
    start: '2022-07-10',
    end: '2022-07-12',
    backgroundColor: 'black',
    borderColor: 'red'

  }
  ]

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        // id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventContent = (e) => {
    console.log(e)
  }

  const handleEventClick = (e) => {
    console.log(e)
  }

  const handleEvents = (events) => {
    setEvents(events)
  }

  return (
    <div>Calendar
    <FullCalendar
    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }}
    initialView="dayGridMonth"
    dateClick={handleDateClick}
    editable={true}
    selectable={true}
    selectMirror={true}
    dayMaxEvents={true}
    initialEvents={bullshitEvents} // alternatively, use the `events` setting to fetch from a feed

    select={handleDateSelect}
    eventContent={handleEventContent}
    eventClick={handleEventClick}

    /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */

  />
    </div>
  )
}

export default Calendar