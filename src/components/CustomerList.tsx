import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const apiUrl = import.meta.env.VITE_API_BASE_URL;

type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
};

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState<ColDef<Customer>[]>([
		{ field: 'firstname', filter: true },
		{ field: 'lastname', width: 150, filter: true },
		{ field: 'streetaddress', width: 150, filter: true },
		{ field: 'postcode', width: 120, filter: true },
		{ field: 'city', width: 120, filter: true },
		{ field: 'email', width: 150, filter: true },
        { field: 'phone', width: 150, filter: true },
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
        <>
            <div style={{ width: '90%', height: 500 }}>
                <h2>Customers</h2>
				<AgGridReact
					columnDefs={columnDefs}
					rowData={customers}
					pagination={true}
					paginationAutoPageSize={true}
					theme={themeMaterial}
				/>
			</div>
        </>
    );
}