import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Customer } from '../types';
import { addCustomerApi } from '../api';
import CustomerAddEditForm from './CustomerAddEditForm';


type AddCustomerProps = {
  fetchCustomers: () => void;
}

export default function AddCustomer(props: AddCustomerProps) {
  const { fetchCustomers } = props;
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Add a customer to the database
   */
  const addCustomer = () => {
    // API call to add the customer
    addCustomerApi(customer)
      .then(() => {
        handleClose();
        fetchCustomers();
      })
      .catch(error => console.error(error))
      .finally(() => {
        // Reset the customer object to empty the form after adding
        setCustomer({} as Customer);
      });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a new customer</DialogTitle>
        <DialogContent>
          {/* Call separate component containing form */}
          <CustomerAddEditForm customer={customer} setCustomer={setCustomer} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
