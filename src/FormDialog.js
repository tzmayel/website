import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MyForm from './MyForm';
import { Grid } from '@material-ui/core';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubscribe = () => {
        console.log('want to subscribe');
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
            style={{padding: '20px'}}
        >
            <Grid item xs={12}>
                <MyForm></MyForm>
            </Grid>
        </Grid>
    );
}
