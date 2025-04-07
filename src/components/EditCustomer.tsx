import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerAddEditForm from './CustomerAddEditForm';
import { Customer, CustomerFullData } from '../types';
import { editCustomerApi } from '../api';

type EditCustomerProps = {
    customer: CustomerFullData;
    fetchCustomers: () => void;
};

export default function EditCustomer(props: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({} as Customer);

    // Open the dialog and set the customer to be edited
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer(props.customer);
    };


    // Close the dialog
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // API call to update the customer
        editCustomerApi(customer, props.customer._links.self.href)
            .then(() => props.fetchCustomers())
            .catch(error => console.error(error))
            .finally(() => handleClose());
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    {/* Call separate component containing form for edition */}
                    <CustomerAddEditForm customer={customer} setCustomer={setCustomer} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}