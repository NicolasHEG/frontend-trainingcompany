import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const apiUrl = import.meta.env.VITE_API_BASE_URL;

type Training = {
    date: string;
    duration: number;
    activity: string;
    customer: string;
};

export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState<ColDef<Training>[]>([
        { field: 'date', filter: true },
        { field: 'duration', width: 150, filter: true },
        { field: 'activity', width: 150, filter: true },
        { field: 'customer', width: 120, filter: true },
    ]);

    useEffect(() => {
        fetch(`${apiUrl}/trainings`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching trainings');
                }
                return response.json();
            })
            .then(data => setTrainings(data._embedded.trainings))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <h1>List of trainings</h1>
            <div style={{ width: '90%', height: 500 }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={trainings}
                    pagination={true}
                    paginationAutoPageSize={true}
                    theme={themeMaterial}
                />
            </div>
        </>
    );
}