import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, ICellRendererParams } from 'ag-grid-community';
import { Customer } from '../types';
import { fetchCustomersApi, deleteCustomerApi } from '../api';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { Button, Snackbar } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  // Definition of the column for the grod
  const [colDefs] = useState<ColDef<Customer>[]>([
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    {
      width: 80,
      cellRenderer: (params: ICellRendererParams) =>
        <EditCustomer customer={params.data} fetchCustomers={fetchCustomers} />
    },
    {
      width: 80,
      cellRenderer: (params: ICellRendererParams) =>
        <Button
          size='small'
          color='error'
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
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

  return (
    <>
    <div style={{ width: '100%', height: 500 }}>
      <h2>Customers</h2>
      <AddCustomer fetchCustomers={fetchCustomers} />
      <AgGridReact
        rowData={customers}
        columnDefs={colDefs}
        pagination={true}
        paginationAutoPageSize={true}
        animateRows={true}
        theme={themeMaterial}
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
