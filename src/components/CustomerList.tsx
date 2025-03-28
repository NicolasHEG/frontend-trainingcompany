import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';
import { Customer } from '../types';

ModuleRegistry.registerModules([AllCommunityModule]);

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const [colDefs] = useState<ColDef<Customer>[]>([
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
    ]);

    useEffect(() => {
        fetch(`${apiUrl}/customers`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching customers');
                }
                return response.json();
            })
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{ width: '90%', height: 500 }}>
            <h2>Customers</h2>
            <AgGridReact
                columnDefs={colDefs}
                rowData={customers}
                pagination={true}
                paginationAutoPageSize={true}
                animateRows={true}
                theme={themeMaterial}
            />
        </div>
    );
}
