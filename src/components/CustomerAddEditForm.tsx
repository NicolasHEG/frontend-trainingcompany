import TextField from '@mui/material/TextField';
import { Customer } from '../types';

// Type composed of Custoemr object and function to set the customer
type CustomerFormProps = {
    customer: Customer;
    setCustomer: (customer: Customer) => void;
};

export default function CustomerAddEditForm({ customer, setCustomer }: CustomerFormProps) {
    return (
        // Form for adding/editing a customer. Same form for both actions.
        <>
            <TextField
                margin="dense"
                name="fisrstname"
                value={customer.firstname}
                onChange={(event) => setCustomer({ ...customer, firstname: event.target.value })}
                label="Firstname"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={(event) => setCustomer({ ...customer, lastname: event.target.value })}
                label="Lastname"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                label="Email"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                label="Phone"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={(event) => setCustomer({ ...customer, streetaddress: event.target.value })}
                label="Street Address"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={(event) => setCustomer({ ...customer, postcode: event.target.value })}
                label="Postcode"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={(event) => setCustomer({ ...customer, city: event.target.value })}
                label="City"
                fullWidth
                variant="standard"
            />
        </>
    );
}