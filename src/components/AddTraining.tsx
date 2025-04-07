import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { CustomerFullData, TrainingAdd } from "../types";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { addTrainingApi } from "../api";

type AddTrainingProps = {
    customer: CustomerFullData
};


export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({} as TrainingAdd);


    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            customer: props.customer._links.customer.href,
        } as TrainingAdd);
    };

    const createTraining = () => {
        // API call to create a new training
        addTrainingApi(training)
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                console.error("Error creating training:", error);
            });
    }


    return (
        <>
            <IconButton size="small" onClick={handleClickOpen}>
                +
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training for {props.customer.firstname} {props.customer.lastname}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date and Time"
                            value={training.date ? dayjs(training.date) : null}
                            onChange={(trainingDate) => setTraining({ ...training, date: trainingDate?.toISOString() || '' })}
                            ampm={false} // 24-hour format
                            slotProps={{ textField: { fullWidth: true } }}
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
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={(event) => setTraining({ ...training, activity: event.target.value })}
                        label="Activity"
                        fullWidth
                        variant="standard"
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