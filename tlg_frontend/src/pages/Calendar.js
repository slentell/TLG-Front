import React, { useEffect, useState, useCallback } from "react";
import FullCalendar, { eventTupleToStore } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import EventModal from "../components/EventModal/EventModal";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  Container,
  TextField,
  FormControl,
  Button,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";

import axios from "axios";
import { Modal } from "stream-chat-react";

const defaultValues = {
  title: "",
  content: "",
  start: "",
  end: "",
  color: "black",
  allDay: false,
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
 

  //  map to format res from getTeamEvents to format for calendar event, [{event1},{event2}]
  const getTeamEvents = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/tlg/calendar/`,
      config
    );
    // console.log(res.data)//  res to format map before setting state
    if (events.length !== res.data.length) {
    setEvents(res.data);
    }
  })

  useEffect(() => {

      console.log('events:', events);
    
    
    getTeamEvents();
  }, [events, getTeamEvents]);

  const addTeamEvent = async (data) => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tlg/calendar/`,
        { data },
        config
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateClick = (date) => {
    console.log("OPEN MODAL: toggle modal state", date.dateStr);
    setModalOpen(true);
    setFormValues({
      ...formValues,
      start: date.dateStr,
      end: date.dateStr,
    });
  };

  const bullshitEvents = [
    {
      id: 1,
      title: "Some bullshit",
      start: "2022-07-10",
      end: "2022-07-12",
      backgroundColor: "black",
      borderColor: "red",
    },
  ];

  const handleDateSelect = (selectInfo) => {
    console.log("select info:", selectInfo);

    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar;
    console.log(calendarApi);

    calendarApi.unselect(); // clear date selection

    // if (formValues.title) {
    //   calendarApi.addEvent({
    //     title: formValues.title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };
  const handleEventSubmit = async (data) => {
    console.log("handleEventSubmit", data);
    addTeamEvent(formValues);
    setModalOpen(false);
    getTeamEvents();
    console.log("formValues", formValues);
  };

  const handleEventContent = (e) => {
    // console.log(e)
  };

  const handleEventClick = (e) => {
    console.log(e);
  };

  const handleEvents = (events) => {
    setEvents(events);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
     
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
        onClose={handleClose}
      >
        <Container sx={{mt:2}}>
        <TextField
          id="title-input"
          name="title"
          label="Title"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
        />
        </Container>
        <Container sx={{mt:2}}>
        <TextField
          id="event-input"
          name="content"
          label="Event Description"
          type="text"
          value={formValues.content}
          onChange={handleInputChange}
        />
        </Container>
        <Container sx={{mt:2}}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Container sx={{mt:2}}>
          <FormControl name="start_date">
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/DD/yyyy"
              value={formValues["start"]}
              onChange={(e) => {
                handleInputChange(e);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          </Container>
          <Container sx={{mt:2}}>
          <FormControl name="end">
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/yyyy"
              value={formValues["end"]}
              onChange={(e) => {
                handleInputChange(e);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          </Container>
        </LocalizationProvider>
        </Container>
        <Container>
        <FormControlLabel
          control={
            <Switch
              checked={formValues.allDay}
              onChange={handleSwitchChange}
              name="allDay"
            />
          }
          label="All Day"
        />
        </Container>
        <Container>
        <Button type="submit" onClick={handleEventSubmit}>
          {" "}
          Submit
        </Button>
        </Container>
      </Modal>
      
      <Container sx={{ backgroundColor: "lightgrey" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          // initialEvents={bullshitEvents} // alternatively, use the `events` setting to fetch from a feed
          events = {events}
          select={handleDateSelect}
          eventContent={handleEventContent}
          eventClick={handleEventClick}

          /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
        />
      </Container>
    </div>
  );
};

export default Calendar;
