import { useEffect, useRef, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, ICellRendererParams } from 'ag-grid-community';
import { Customer } from '../types';
import { fetchCustomersApi, deleteCustomerApi } from '../api';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { Button, IconButton, Snackbar } from '@mui/material';
import AddTraining from './AddTraining';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef<AgGridReact>(null);

    // Definition of the column for the grod
    const [colDefs] = useState<ColDef<Customer>[]>([
        { field: 'firstname', sortable: true, filter: true, flex: 1 },
        { field: 'lastname', sortable: true, filter: true, flex: 1 },
        { field: 'streetaddress', sortable: true, filter: true, flex: 1 },
        { field: 'postcode', sortable: true, filter: true, flex: 1 },
        { field: 'city', sortable: true, filter: true, flex: 1 },
        { field: 'email', sortable: true, filter: true, flex: 1 },
        { field: 'phone', sortable: true, filter: true, flex: 1 },
        {
            flex: 0.5,
            cellRenderer: (params: ICellRendererParams) =>
                <AddTraining customer={params.data} />
        },
        {
            flex: 0.5,
            cellRenderer: (params: ICellRendererParams) =>
                <EditCustomer customer={params.data} fetchCustomers={fetchCustomers} />
        },
        {
            flex: 0.5,
            cellRenderer: (params: ICellRendererParams) =>
                <IconButton
                    size='small'
                    color='error'
                    onClick={() => handleDelete(params)}
                >
                    <DeleteIcon fontSize='small' />
                </IconButton>
        },
    ]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    /**
     * Retrieve the customers
     */
    const fetchCustomers = () => {
        // API call to fetch the customers
        fetchCustomersApi()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error));
    }

    /**
     * Delete a customer
     * @param params The params of the cell renderer
     */
    const handleDelete = (params: ICellRendererParams) => {
        if (window.confirm('Are you sure you want to delete this customer ?')) {
            deleteCustomerApi(params.data._links.self.href)
                .then(() => fetchCustomers())
                .then(() => setOpen(true))
                .catch(error => console.error(error));
        }
    }

    /**
     * Download the CSV file
     */
    // memorize the function to avoid unnecessary re-renders
    const exportCsv = useCallback(() => {
        const params = {
            fileName: 'customers.csv',
            // Automapping colnames but could be an array of string manually defined [""firstname", "lastname", ...]
            columnKeys: colDefs
                // Only include columns with a field property
                .filter(col => col.field)
                .map(col => col.field as string),
        };
        gridRef.current!.api.exportDataAsCsv(params);
    }, [colDefs]);

    return (
        <>
            <div style={{ width: '100%', height: 500 }}>
                <h2>Customers</h2>
                <AddCustomer fetchCustomers={fetchCustomers} />
                {/* csv export of customers */}
                <IconButton
                    size='medium'
                    color='default'
                    onClick={exportCsv}
                >
                    <FileDownloadIcon fontSize='inherit' />
                </IconButton>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    animateRows={true}
                    theme={themeMaterial}
                    ref={gridRef}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message='Customer deleted successfully as well as all its trainings'
            />
        </>
    );
}
