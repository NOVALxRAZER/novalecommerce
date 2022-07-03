import "./allOrderHistory.css"
import { DataGrid } from "@material-ui/data-grid";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getAllOrderUser, editUserOrder, stateGetAllUserOrder, stateEditOrderUser } from "../../redux/apiCalls"
import { useState } from "react";

const AllOrderHistory = () => {
    const [konfirm, setKonfirm] = useState(false);
    const [rowId, setRowId] = useState("");
    const [sukses, setSukses] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const allOrders = useSelector((state) => state.getAllUserOrders.getAllOrders)
    const updatedOrder = useSelector((state) => state.editUserOrder.editUserOrders)
    const dispatch = useDispatch();

    useEffect(() => {
        stateGetAllUserOrder(dispatch)
        getAllOrderUser(dispatch);
        if(updatedOrder?.response === 1){
            stateEditOrderUser(dispatch);
            getAllOrderUser(dispatch);
            setSukses(true);
        }
    }, [dispatch, updatedOrder])

    const handleConfirm = () => {
        // const data = {
        //     status: "Confirmed",
        // }
        setKonfirm(false)
        editUserOrder(dispatch, rowId, {
            status: "Confirmed",
        });
    }

    const handleConfirm2 = () => {
        setKonfirm(true)
    }

    const handleConfirm3 = () => {
        setKonfirm(false)
    }

    const handleTutup = () => {
        setSukses(false)
    }

    const columns = [
        {
            field: "_id",
            headerName: "Order Code",
            width: 220
        },
        {
            field: "email",
            headerName: "User Email",
            width: 220
        },
        {
            field: "time",
            headerName: "Order Time",
            width: 200,
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: "-10px", maxHeight: "30px" }} id="demo-simple-select-label">Actions</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Actions"
                                style={{ height: "35px" }}
                            >
                                <MenuItem onClick={() => handleConfirm2(setRowId(params.row._id))}>
                                    Confirm
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </>
                );
            },
        },
    ];

    return (
        <div className="orderHistory">
            <>
                <Dialog
                        fullScreen={fullScreen}
                        open={konfirm}
                        onClose={handleConfirm3}
                        aria-labelledby="responsive-dialog-title1"
                    >
                        <DialogTitle id="responsive-dialog-title1">
                            {"Confirm This Order?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are You sure you want to Confirm this Order?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleConfirm3} autoFocus>
                                Cancel
                            </Button>
                            <Button onClick={() => handleConfirm(rowId)} autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        fullScreen={fullScreen}
                        open={sukses}
                        onClose={handleTutup}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {"Success"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Order has been Successfully Confirmed!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleTutup} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
                {allOrders ? (
                    <DataGrid
                        rows={allOrders}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                ) : (
                    "LOADING"
                )
                }
        </div>
    )
}

export default AllOrderHistory