import "../css/orderHistory.css"
import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
} from "@material-ui/icons";
import { useEffect } from 'react';
// import { Card, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrder, stateGetUserOrder } from "../redux/apiCalls";
import { DataGrid } from "@material-ui/data-grid";
import noAvatar from '../images/noavatar.jpg'
import { Link } from "@mui/material";

const OrderHistory = () => {
const player = useSelector(state => state.user.currentUser);
const dispatch = useDispatch();
const orders = useSelector((state) => state.getOrder.orders);

useEffect(() => {
    stateGetUserOrder(dispatch);
    getUserOrder(player._id, dispatch);
}, [player, dispatch])

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
];

return (
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Order History</h1>
            <Link href="/">
                <button className="userBack" >
                    Back to Homepage
                </button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img
                        src={player?.image ? player?.image : noAvatar}
                        alt=""
                        className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{player.username}</span>
                        <span className="userShowUserTitle">Happy Me</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className="userShowIcon" />
                        <span className="userShowInfoTitle">{player.username}</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon" />
                        <span className="userShowInfoTitle">{player.phone}</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className="userShowIcon" />
                        <span className="userShowInfoTitle">{player.email}</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className="userShowIcon" />
                        <span className="userShowInfoTitle">{player.address}</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                { orders ? (
                    <DataGrid
                        rows={orders}
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
        </div>
    </div>
)
}

export default OrderHistory