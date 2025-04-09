import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
        setCustomer({} as Customer);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Add a new customer to the database
     * @param newCustomer customer to be added
     */
    const addCustomer = (newCustomer: Customer) => {
        // API call to add the customer
        addCustomerApi(newCustomer)
            .then(() => {
                handleClose();
                fetchCustomers();
            })
            .catch(error => console.error(error))
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
                    <CustomerAddEditForm customer={customer} setCustomer={setCustomer} onSave={addCustomer} onCancel={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}
