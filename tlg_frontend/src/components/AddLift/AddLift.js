
import React, { useState } from "react";
import { Typography, FormLabel, Box, FormControl, Select, MenuItem, TextField, Button, Grid }  from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const Form = () => {
    const [formValues, setFormValues] = useState({lift: "power_clean", weight: "100"});
    const [date, setDate] = React.useState(new Date());

    const handleInputChange = (e) => {
        console.log('e.target ', e.target)
        const { name, value } = e.target;
        console.log('name ', typeof name)
        console.log('value ', value)
        setFormValues({
            ...formValues,
            [name] : value,
        });
    };
    const handleSubmit = (event) => {
        console.log('submit event ', event)
        event.preventDefault();
        console.log(formValues);
    };

    console.log('form values ', formValues)
    console.log('form values lift ', formValues.lift)

    return (
        <Box 
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: "lightgray", mt: '150px', borderRadius: '30px',
                width: '50%',
                m: 15,
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item sx={{mt:2}}>
                    <Typography variant="h3">
                        Log your lift sesh here
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid item sx={{m:1}} align="center">
                        <FormControl >
                            <FormLabel id="lift">Select a lift</FormLabel>
                            <Select
                                name="lift"
                                value={formValues.lift}
                                label="Select a Lift"
                                onChange={handleInputChange}
                            >
                                <MenuItem value='power_clean'>Power Clean</MenuItem>
                                <MenuItem value='front_squat'>Front Squat</MenuItem>
                                <MenuItem value='squat_clean'>Squat Clean</MenuItem>
                                <MenuItem value='push_jerk'>Push Jerk</MenuItem>
                                <MenuItem value='power_snatch'>Power Snatch</MenuItem>
                                <MenuItem value='squat_snatch'>Squat Snatch</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{m:1}}>
                    <TextField
                        id="weight-input"
                        name="weight"
                        label="Weight"
                        type="number"
                        value={formValues.weight}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item sx={{m:1}}>
                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChange={(newDate) => {
                                        setDate(newDate);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{mb:2}} align="center">
                        <Button variant="contained" color="primary" type="submit" >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Box>
        // </Container>
        );
    };
    export default Form;
