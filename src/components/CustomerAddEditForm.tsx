import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Customer } from '../types';

type CustomerFormProps = {
    customer: Customer;
    setCustomer: (customer: Customer) => void;
    // Function when click on save button with customer as parameter
    onSave: (customer: Customer) => void;
    // Function to cancel the operation
    onCancel: () => void;
};

export default function CustomerAddEditForm({ customer, setCustomer, onSave, onCancel }: CustomerFormProps) {
    // State to manage the errors for each field
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
    });

    /**
     * Fields validation function
     * @param name name of the field to validate
     * @param value value of the field to validate
     * @returns error message if validation fails, empty string otherwise
     */
    const validateField = (name: string, value: string) => {
        let error = '';
        if (!value.trim()) {
            error = `${name} is required`;
            //Regex to check if the field is empty or contains only spaces
        } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Invalid email format';
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
        return error;
    };

    /**
     * Validate all fields in the form
     * @returns true if the form is valid, false otherwise
     */
    const validateForm = () => {
        const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'];
        const newErrors = requiredFields.reduce((acc, field) => {
            const value = (customer as any)[field] || '';
            const error = validateField(field, value);
            return { ...acc, [field]: error };
        }, {} as typeof errors);

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    /**
     * Handle change event for input fields
     * @param event change event
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
        validateField(name, value);
    };

    /**
     * Handle save button click event
     */
    const handleSave = () => {
        if (validateForm()) {
            onSave(customer);
        }
    };

    return (
        <>
            <TextField
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={handleChange}
                label="Firstname"
                fullWidth
                variant="standard"
                error={!!errors.firstname}
                helperText={errors.firstname}
            />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={handleChange}
                label="Lastname"
                fullWidth
                variant="standard"
                error={!!errors.lastname}
                helperText={errors.lastname}
            />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={handleChange}
                label="Email"
                fullWidth
                variant="standard"
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                label="Phone"
                fullWidth
                variant="standard"
                error={!!errors.phone}
                helperText={errors.phone}
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={handleChange}
                label="Street Address"
                fullWidth
                variant="standard"
                error={!!errors.streetaddress}
                helperText={errors.streetaddress}
            />
            <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={handleChange}
                label="Postcode"
                fullWidth
                variant="standard"
                error={!!errors.postcode}
                helperText={errors.postcode}
            />
            <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={handleChange}
                label="City"
                fullWidth
                variant="standard"
                error={!!errors.city}
                helperText={errors.city}
            />
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onCancel} style={{ marginRight: '8px' }} variant="outlined" color="error">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="success">
                    Save
                </Button>
            </div>
        </>
    );
}