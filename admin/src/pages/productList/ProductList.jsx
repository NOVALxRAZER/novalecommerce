import "./productList.css";
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
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts, stateDeleteProduct, stateGetProduct, stateGetUser } from "../../redux/apiCalls";

export default function ProductList() {
    const [sukses, setSukses] = useState(false);
    const [hapus, setHapus] = useState(false);
    const [rowId, setRowId] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const products = useSelector((state) => state.getAllProducts.getAllProduct);
    const deleteSomeProduct = useSelector((state) => state.deleteProducts.deleteProduct);

    useEffect(() => {
        stateGetProduct(dispatch);
        stateGetUser(dispatch);
        getAllProducts(dispatch);
        if (deleteSomeProduct === "Product has been Deleted.") {
            stateDeleteProduct(dispatch);
            getAllProducts(dispatch);
            setSukses(true);
        }
    }, [dispatch, deleteSomeProduct]);

    const handleDelete = (id) => {
        setHapus(false);
        deleteProduct(id, dispatch);
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
            width: 220
        },
        {
            field: "product",
            headerName: "Product",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "inStock",
            headerName: "Stock",
            width: 150,
        },
        {
            field: "price",
            headerName: "Price",
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
                                <Link to={"/product/" + params.row._id} style={{ textDecoration: "none", color: "black" }}>
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
                );
            },
        },
    ];

    return (
        <div className="productList">
            <>
                <Dialog
                    fullScreen={fullScreen}
                    open={hapus}
                    onClose={handleHapus2}
                    aria-labelledby="responsive-dialog-title1"
                >
                    <DialogTitle id="responsive-dialog-title1">
                        {"Delete this Product?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are You sure you want to Delete this Product?
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
                            Prodcut Has been Successfully Deleted!
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
                rows={products}
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