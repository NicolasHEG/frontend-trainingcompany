import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchTrainingsWithCustomer } from '../api';
import { Training } from '../types';

// Setup the localizer
const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
    // 1 - Fetch trainings with customer info
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [view, setView] = useState<View>(Views.WEEK);

    useEffect(() => {
        fetchTrainingsWithCustomer().then(data => {
            // Transform the data to match Training type
            const formattedTrainings = data.map((item: any) => ({
                id: item.id,
                date: item.date,
                duration: item.duration,
                activity: item.activity,
                customer: `${item.customer.firstname} ${item.customer.lastname}`,
            }));

            setTrainings(formattedTrainings);
        });
    }, []);

    // 2  - Map the trainings to calendar events
    const events = trainings.map(training => {
        const [datePart, timePart] = training.date.split('T');
        const [hours, minutes] = timePart.split(':').map(Number);
        const start = new Date(datePart);
        start.setHours(hours, minutes);
        const end = new Date(datePart);
        end.setHours(hours, minutes + training.duration);

        return {
            id: training.id,
            title: `${training.activity} / ${training.customer}`,
            start,
            end,
        };
    });

    // 3 - Render the calendar with the events
    return (
        <div style={{ flex: 1, margin: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <Calendar
            localizer={localizer}
            events={events}
            view={view}
            onView={(view: View) => setView(view)}
            style={{ height: '85vh', fontSize: '14px' }}
            />
        </div>
    );
}
    
