import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';
import { Training } from '../types';
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

const apiUrl = import.meta.env.VITE_API_BASE_URL;



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
            // Render the customer as a string
            valueFormatter: (params) => `${params.value.firstname} ${params.value.lastname}`
        },
    ]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch(`${apiUrl}/trainings`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching trainings');
                }
                return response.json();
            })
            .then(data => {
                // Loop through the trainings and fetch the customer for each training
                Promise.all(data._embedded.trainings.map(async (training: any) => {
                    const customer = await getCustomerFromTraining(training._links.customer.href);
                    if (customer) {
                        training.customer = customer;
                    }
                    // Return the updated training object
                    return training;
                })).then((updatedTrainings) => {
                    // Update state after all customers are fetched
                    setTrainings(updatedTrainings);
                });

            })
            .catch(error => console.error(error));
    }

    const getCustomerFromTraining = async (url: string) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching customer');
                }
                return response.json();
            })
            .catch(error => {
                console.error(error);
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
