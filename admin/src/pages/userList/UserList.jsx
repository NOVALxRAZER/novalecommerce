import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUsers, stateDeleteUser, stateGetProduct, stateGetUser } from "../../redux/apiCalls";
import noAvatar from "../../images/noavatar.jpg"
import "./userList.css";

export default function UserList() {
    const [sukses, setSukses] = useState(false);
    const [hapus, setHapus] = useState(false);
    const [rowId, setRowId] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const users = useSelector((state) => state.getAllUsers.getUsers);
    const deleteUsers = useSelector((state) => state.deleteUsers.deleteUser);

    useEffect(() => {
        stateGetProduct(dispatch);
        stateGetUser(dispatch);
        getAllUsers(dispatch);
        if (deleteUsers === "User has been Deleted.") {
            stateDeleteUser(dispatch);
            getAllUsers(dispatch);
            setSukses(true);
        }
    }, [dispatch, deleteUsers]);

    const handleDelete = (id) => {
        setHapus(false);
        deleteUser(id, dispatch);
    };

    const handleTutup = () => {
        setSukses(false);
    }

    const handleHapus = () => {
        setHapus(true);
    }

    const handleHapus2 = () => {
        setHapus(false);
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 200
        },
        {
            field: "user",
            headerName: "Username",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg"
                            src={params.row.image || noAvatar} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 200
        },
        {
            field: "isAdmin",
            headerName: "Admin",
            width: 120,
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
                                <Link to={"/user/" + params.row._id} style={{ textDecoration: "none", color: "black" }}>
                                    <MenuItem >
                                        Edit
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={() => handleHapus(setRowId(params.row._id))}>
                                    Delete
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </>
                    // <>
                    //     <Link to={"/user/" + params.row._id}>
                    //         <button className="userListEdit">Edit</button>
                    //     </Link>
                    //     <DeleteOutline
                    //         className="userListDelete"
                    //         onClick={() => handleDelete(params.row._id)}
                    //     />
                    // </>
                );
            },
        },
    ];

    console.log(rowId, "row id")

    return (
        <div className="userList">
            <>
                <Dialog
                    fullScreen={fullScreen}
                    open={hapus}
                    onClose={handleHapus2}
                    aria-labelledby="responsive-dialog-title1"
                >
                    <DialogTitle id="responsive-dialog-title1">
                        {"Delete this User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are You sure you want to Delete this User?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleHapus2} autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={() => handleDelete(rowId)} autoFocus>
                            Delete
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
                            User Has been Successfully Deleted!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleTutup} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}
