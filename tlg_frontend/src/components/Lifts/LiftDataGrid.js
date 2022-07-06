import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import { useLifts } from "../../Providers/LiftProvider";
import { useSelector } from "react-redux";
import { LiftProvider } from "../../Providers/LiftProvider";

// CRUD 
import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';

// Update Functionality
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';

const useFakeMutation = () => {
    return React.useCallback(
      (lift) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (lift.name?.trim() === '') {
              reject();
            } else {
              resolve(lift);
            }
          }, 200),
        ),
      [],
    );
};

function computeMutation(newRow, oldRow) {
    if (newRow.date_of_lift !== oldRow.date_of_lift) {
        return `Date from '${oldRow.date_of_lift}' to '${newRow.date_of_lift}'`;
    }
    if (newRow.lift !== oldRow.lift) {
        return `Lift from '${oldRow.lift}' to '${newRow.lift}'`;
    }
    if (newRow.weight !== oldRow.weight) {
        return `Weight from '${oldRow.weight}' to '${newRow.weight}'`;
    }
    return null;
}

export default function AskConfirmationBeforeSave() {

    const mutateRow = useFakeMutation();
    const noButtonRef = React.useRef(null);
    const [promiseArguments, setPromiseArguments] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { getLiftHistory, lifts, setLifts, handleLiftUpdate } = useLifts()

    const getLifts = async () => {
        console.log('get lifts called')
        await getLiftHistory(currentUser.id, true)
    }
    // when the component mounts, get the lifts based off of user auth
    useEffect(() => {
        if(currentUser) getLifts()
    }, [currentUser, getLifts])

    // when the lifts change, get the lifts
    useEffect(() => {
        getLifts()
    }, [lifts])

    // generates Rows
    const displayRows = () => {
        return lifts.map((lift) => {
            return {
                id: lift.id,
                date_of_lift: lift.date_of_lift,
                lift: lift.lift,
                weight: lift.weight,
            }
        })
    }

    const processRowUpdate = React.useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                console.log('new row ', newRow)
                console.log('old row ', oldRow)
                console.log('mutation is ', mutation)
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        [],
    );

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
      };
    
    const handleYes = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;
        try {
            // Make the HTTP request to save in the backend
            const res = await mutateRow(newRow);
            console.log('res ', res)
            const response = await handleLiftUpdate(newRow, currentUser.id)
        
            // await getLifts()
            setSnackbar({ children: 'Lift successfully saved', severity: 'success' });
            resolve(res);
            setPromiseArguments(null);
        } catch (error) {
            setSnackbar({ children: "Name can't be empty", severity: 'error' });
            reject(oldRow);
            setPromiseArguments(null);
        }
    };

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog
                maxWidth="xs"
                open={!!promiseArguments}
            >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent dividers>
                {`Pressing 'Yes' will change ${mutation}.`}
            </DialogContent>
            <DialogActions>
                <Button ref={noButtonRef} onClick={handleNo}>
                No
                </Button>
                <Button onClick={handleYes}>Yes</Button>
            </DialogActions>
            </Dialog>
        );
    }
    return (
        <LiftProvider>
            <Container sx={{
                backgroundColor: "whitesmoke"
            }}>
                <div style={{ height: 400, width: '100%' }}>
                    {renderConfirmDialog()}
                    { lifts && <DataGrid
                        rows={displayRows()}
                        columns={[
                            { field: "date_of_lift", headerName: "Date", width: 333, editable: true },
                            { field: "lift", headerName: "Lift", width: 333, editable: true },
                            { field: "weight", type: "number", headerName: "Weight", width: 333, editable: true },
                        ]}
                        processRowUpdate={processRowUpdate}
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                    }
                    {!!snackbar && (
                        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                            <Alert {...snackbar} onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )}
                </div>
            </Container>
        </LiftProvider>
    );
};

