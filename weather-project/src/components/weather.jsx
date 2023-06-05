import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    return (
        <div className="calender">
            <FullCalendar
                style={{ border: "1px solid black" }}
                height="100vh"
                plugins={[dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right:""
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                    {
                        id: "12315",
                        title: "All-day event",
                        date: "2023-06-10",
                    },
                    {
                        id: "5123",
                        title: "Timed event",
                        date: "2023-06-10",
                    },
                ]}
            />
        </div>
    );
};

export default Calendar;
