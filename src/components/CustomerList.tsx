import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, ICellRendererParams } from 'ag-grid-community';
import { Customer } from '../types';
import { fetchCustomersApi } from '../api';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

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
        <EditCustomer customer={params.data} fetchCustomers={fetchCustomers} />    },
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

  return (
    <div style={{ width: '100%', height: 500 }}>
      <h2>Customers</h2>
      <AddCustomer fetchCustomers={fetchCustomers} />
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
