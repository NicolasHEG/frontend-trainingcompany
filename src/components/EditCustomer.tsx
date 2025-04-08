import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerAddEditForm from './CustomerAddEditForm';
import { Customer, CustomerFullData } from '../types';
import { editCustomerApi } from '../api';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

    /**
     * Update an edited customer in the database
     * @param editedCustomer customer to be updated
     */
    const handleSave = (editedCustomer: Customer) => {
        // API call to update the customer
        editCustomerApi(editedCustomer, props.customer._links.self.href)
            .then(() => props.fetchCustomers())
            .catch(error => console.error(error))
            .finally(() => handleClose());
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon fontSize="small" color="primary" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    {/* Call separate component containing form for edition */}
                    <CustomerAddEditForm customer={customer} setCustomer={setCustomer} onSave={handleSave} onCancel={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}