import React, { useState } from "react";
import {
  Typography,
  FormLabel,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useLifts } from "../../Providers/LiftProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import moment from 'moment'

const dateFormatter = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}
const Form = () => {
    // moment(new Date()).format('YYYY-MM-DD')
    // const [date, setDate] = React.useState(new Date());
    const [submittedStatus, setSubmittedStatus] = React.useState(null)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [formValues, setFormValues] = useState({
        lift: "power_clean",
        weight: 100,
        date_of_lift: dateFormatter(new Date()),
    });

    const { handleLiftSubmit } = useLifts();

    const handleInputChange = (e) => {
        // if input is date, there is no e.target
        console.log('e is ', e)
        if (!e.target) {
            const date = e
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); 
            var yyyy = date.getFullYear();
            console.log('the date inside handleInputChange ', `${yyyy}-${mm}-${dd}`)
            setFormValues({
                ...formValues,
                ['date_of_lift']: `${yyyy}-${mm}-${dd}`,
            }); 
            console.log('date  inside if ', formValues.date_of_lift)
        }
        // if input is not date, need to access target property
        else {
            const { name, value } = e.target;
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
        console.log('after conditionals ', formValues.date_of_lift);
    }
    const displaySubmitMessage = () => {
        console.log(typeof submittedStatus, submittedStatus)
        return (
            <Alert severity={submittedStatus} onClose={() => {setAlertOpen(false)}}> {submittedStatus == 'success' ? 'Your lift was saved !' : 'Your lift was not saved. Please try again'}</Alert> 
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isSubmitted = await handleLiftSubmit(formValues);
        setAlertOpen(true)
        setSubmittedStatus(isSubmitted);
    };

    return (
    <Box
        sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            backgroundColor: "lightgray",
            mt: "150px",
            borderRadius: "30px",
            width: "50%",
            m: 15,
        }}
        noValidate
        autoComplete="off"
    >
        <Grid container alignItems="center" justify="center" direction="column">
        <Grid item sx={{ mt: 2 }}>
            <Typography variant="h3">Log your lift sesh here</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
            <Grid item sx={{ m: 1 }} align="center">
            <FormControl>
                <FormLabel id="lift">Select a lift</FormLabel>
                <Select
                name="lift"
                value={formValues.lift}
                label="Select a Lift"
                onChange={handleInputChange}
                >
                <MenuItem value="power_clean">Power Clean</MenuItem>
                <MenuItem value="front_squat">Front Squat</MenuItem>
                <MenuItem value="squat_clean">Squat Clean</MenuItem>
                <MenuItem value="push_jerk">Push Jerk</MenuItem>
                <MenuItem value="power_snatch">Power Snatch</MenuItem>
                <MenuItem value="squat_snatch">Squat Snatch</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item sx={{ m: 1 }}>
            <TextField
                id="weight-input"
                name="weight"
                label="Weight"
                type="number"
                value={formValues.weight}
                onChange={handleInputChange}
            />
            </Grid>
            <Grid item sx={{ m: 1 }}>
            <FormControl name='date_of_lift'>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                <DatePicker
                    name="date_of_lift"
                    label="Date"
                    // selected={formValues.date_of_lift}
                    value={formValues.date_of_lift}
                    onChange={handleInputChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                {/* </LocalizationProvider> */}
            </FormControl>
            </Grid>
            <Grid item sx={{ mb: 2 }} align="center">
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
            </Grid>
        </form>
        { alertOpen && displaySubmitMessage()}
        </Grid>
    </Box>
    );
};
export default Form;
