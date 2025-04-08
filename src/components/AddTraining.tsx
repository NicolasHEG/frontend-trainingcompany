import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { CustomerFullData, TrainingAdd } from "../types";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { addTrainingApi } from "../api";
import AddIcon from '@mui/icons-material/Add';

type AddTrainingProps = {
    customer: CustomerFullData
};

export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({} as TrainingAdd);
    const [errors, setErrors] = useState(
        {
            date: false,
            duration: false,
            activity: false
        }
    );

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            customer: props.customer._links.customer.href,
        } as TrainingAdd);
        setErrors({ date: false, duration: false, activity: false });
    };

    /**
     * Check if all fields are filled
     * @returns true if the form is valid, false otherwise
     */
    const validateForm = () => {
        const newErrors = {
            date: !training.date,
            duration: !training.duration,
            activity: !training.activity,
        };
        setErrors(newErrors);
        // If all values from array are false, the form is valid so the opposite value is returned
        return !Object.values(newErrors).some((error) => error);
    };

    const createTraining = () => {
        // Check if the form is valid before sending the API request
        if (validateForm()) {
            // API call to create a new training
            addTrainingApi(training)
                .then(() => {
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error creating training:", error);
                });
        }
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <AddIcon fontSize="small" color="success" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training for <u>{props.customer.firstname} {props.customer.lastname}</u></DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date and Time"
                            value={training.date ? dayjs(training.date) : null}
                            onChange={(trainingDate) => setTraining({ ...training, date: trainingDate?.toISOString() || '' })}
                            ampm={false} // 24-hour format
                            slotProps={{ textField: { fullWidth: true, error: errors.date, helperText: errors.date ? "Date is required" : "" } }}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={(event) => setTraining({ ...training, duration: event.target.value })}
                        label="Duration"
                        fullWidth
                        variant="standard"
                        error={errors.duration}
                        helperText={errors.duration ? "Duration is required" : ""}
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={(event) => setTraining({ ...training, activity: event.target.value })}
                        label="Activity"
                        fullWidth
                        variant="standard"
                        error={errors.activity}
                        helperText={errors.activity ? "Activity is required" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}