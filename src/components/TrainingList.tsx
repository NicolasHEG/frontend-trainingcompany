import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';
import { Training } from '../types';
import dayjs from "dayjs";
import { fetchTrainingsWithCustomer } from '../api';

ModuleRegistry.registerModules([AllCommunityModule]);



export default function TrainingList() {
  // List of trainings
  const [trainings, setTrainings] = useState<Training[]>([]);

  // Define the column definitions for the grid
  const [colDefs] = useState<ColDef<Training>[]>([
    {
      field: 'date', sortable: true, filter: 'agDateColumnFilter', flex: 1,
      // format the date as a string with the format 'DD.MM.YYYY HH:mm'
      valueFormatter: (params) => dayjs(params.value as string).format('DD.MM.YYYY HH:mm'),
      // Value kept to a date object for the filter to work
      valueGetter: (params) => dayjs(params.data?.date as string).toDate(),
    },
    { field: 'duration', sortable: true, filter: true, flex: 1 },
    { field: 'activity', sortable: true, filter: true, flex: 1 },
    {
      field: 'customer', sortable: true, filter: true, flex: 1,
      // format the customer field by concatenating the firstname and lastname
      valueFormatter: (params) => params.value?.firstname + " " + params.value?.lastname,
    },
  ]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  /**
   * Retrieve the trainings
   */
  const fetchTrainings = () => {
    // API call to fetch the trainings with customer informations
    fetchTrainingsWithCustomer()
      .then(data => {
        setTrainings(data);
      })
      .catch(error => {
        console.error('Error fetching trainings:', error);
      });
  }


  return (
    <div style={{ width: '100%', height: 500 }}>
      <h2>Trainings</h2>
      <AgGridReact
        columnDefs={colDefs}
        rowData={trainings}
        pagination={true}
        paginationAutoPageSize={true}
        animateRows={true}
        theme={themeMaterial}
      />
    </div>
  );
}
