import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';
import { Training } from '../types';
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

const apiUrl = import.meta.env.VITE_API_TRAINING_CUSTOMER_URL;



export default function TrainingList() {
    // List of trainings
    const [trainings, setTrainings] = useState<Training[]>([]);

    // Define the column definitions for the grid
    const [colDefs] = useState<ColDef<Training>[]>([
        {
            field: 'date', sortable: true, filter: 'agDateColumnFilter',
            // format the date as a string with the format 'DD.MM.YYYY hh:mm'
            valueFormatter: (params) => dayjs(params.value as string).format('DD.MM.YYYY hh:mm')
        },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        {
            field: 'customer', sortable: true, filter: true,
            valueFormatter: (params) => params.value?.firstname + " " + params.value?.lastname,
        },
    ]);

    useEffect(() => {
        fetchTrainingsWithCustomer();
    }, []);

    const fetchTrainingsWithCustomer = () => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching trainings with customers');
                }
                return response.json()
            })
            .then(data => {
                setTrainings(data);
            })
            .catch(error => {
                console.error('Error fetching trainings:', error);
            });
    }



    return (
        <div style={{ width: '90%', height: 500 }}>
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
