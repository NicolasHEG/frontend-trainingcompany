import { useState, useEffect } from 'react';
import { Calendar, Views, View, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchTrainingsWithCustomer } from '../api';
import { Training } from '../types';
import dayjs from 'dayjs';

// Setup the localizer to 
const localizer = dayjsLocalizer(dayjs);

export default function TrainingCalendar() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchTrainingsWithCustomer().then(data => {
            // Transform the data to match Training type
            const formattedTrainings = data.map((training: any) => ({
                id: training.id,
                date: training.date,
                duration: training.duration,
                activity: training.activity,
                customer: `${training.customer.firstname} ${training.customer.lastname}`,
            }));

            setTrainings(formattedTrainings);
        });
    }, []);

    // Map the trainings to calendar events
    const events = trainings.map(training => {
        // Extraction of the date and time from the training object in ISO format
        const [datePart, timePart] = training.date.split('T');
        const [hours, minutes] = timePart.split(':').map(Number);
        const start = dayjs(datePart).hour(hours).minute(minutes).toDate();
        const end = dayjs(start).add(training.duration, 'minute').toDate();

        return {
            id: training.id,
            title: `${training.activity} / ${training.customer}`,
            start,
            end,
        };
    });

    return (
        <div style={{ flex: 1, margin: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Training Calendar</h2>
            <Calendar
            localizer={localizer}
            events={events}
            view={view}
            onView={(view: View) => setView(view)}
            date={date}
            // Navigate to calendar dates
            onNavigate={(date: Date) => setDate(date)}
            style={{ height: '75vh', fontSize: '14px', backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}
            // Show a popup with the training details when an event is clicked
            onSelectEvent={(event) => {
                alert(`Training: ${event.title}\nStart: ${dayjs(event.start).format('DD/MM/YYYY HH:mm')}\nEnd: ${dayjs(event.end).format('DD/MM/YYYY HH:mm')}`);
            }}
            // Custom styles for events
            eventPropGetter={() => {
                // No background color for agenda view
                if (view === Views.AGENDA) {
                return { style: {} };
                }
                return {
                style: {
                    backgroundColor: '#64b5f6',
                    color: '#fff',
                    borderRadius: '5px',
                    padding: '2px 5px',
                },
                };
            }}
            formats={{
                // 24-hours format for the time
                timeGutterFormat: (date) => dayjs(date).format('HH:mm'),
                eventTimeRangeFormat: ({ start, end }) => `${dayjs(start).format('HH:mm')} - ${dayjs(end).format('HH:mm')}`,
                agendaTimeRangeFormat: ({ start, end }) => `${dayjs(start).format('HH:mm')} - ${dayjs(end).format('HH:mm')}`,
            }}
            />
        </div>
    );
}

