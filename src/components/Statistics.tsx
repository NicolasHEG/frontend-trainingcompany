import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { fetchTrainingsWithCustomer } from '../api';
import { Training } from '../types';


export default function Statistics() {
  const [activities, setActivities] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [dayCounts, setDayCounts] = useState<number[]>([]);

  useEffect(() => {
    fetchTrainingsWithCustomer()
      .then((data: Training[]) => {
        // Group trainings by activity and sum their durations
        // Record is key-value pairs type
        const activityDurationsMap: Record<string, number> = data.reduce((acc: Record<string, number>, training) => {
          // Increment the total duration for the activity
          acc[training.activity] = (acc[training.activity] || 0) + training.duration;
          return acc;
        }, {});

        // Extract activities and their total durations
        setActivities(Object.keys(activityDurationsMap));
        setDurations(Object.values(activityDurationsMap));

        
        // Group trainings by day of the week and count them
        const dayCountsMap: Record<string, number> = data.reduce((acc: Record<string, number>, training) => {
          const date = new Date(training.date);
          // Extract the name of the day of the current date
          const dayName = date.toLocaleString('default', { weekday: 'long' });
          // Check if the dayName already exists in the accumulator and increment its count
          acc[dayName] = (acc[dayName] || 0) + 1;
          return acc;
        }, {});

        // Extract days and their counts
        setDays(Object.keys(dayCountsMap));
        setDayCounts(Object.values(dayCountsMap));
      })
      .catch((error) => console.error('Error fetching training data:', error));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', gap: '40px' }}>
      
      {/* First chart for total duration of trainings activities */}
      <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px' }}>Total duration of trainings activities</h2>
      <BarChart
        xAxis={[{ scaleType: 'band', data: activities, label: 'Activity' }]}
        yAxis={[{ label: 'Total Duration (minutes)' }]}
        series={[{ data: durations }]}
        width={700}
        height={500}
        sx={{ backgroundColor: '#f0f8ff', borderRadius: '12px', padding: '20px' }}
      />
      </div>
      
      {/* Second chart for number of training per week days */}
      <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px'}}>Trending days for training</h2>
      <BarChart
        xAxis={[{ scaleType: 'band', data: days, label: 'Day of the week' }]}
        yAxis={[{ label: 'Number of Trainings' }]}
        series={[{ data: dayCounts }]}
        width={700}
        height={500}
        sx={{ backgroundColor: '#fff8e1', borderRadius: '12px', padding: '20px' }}
      />
      </div>
    </div>
  );
}