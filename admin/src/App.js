import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import AllOrderHistory from "./pages/orderHistory/AllOrderHistory"
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

function App() {
    const admin = useSelector((state) => state.user.currentUser);
    // console.log(admin, "user")

    // JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoutes isAdmin={admin} />
            </Switch>
        </Router>
    );
}

const PrivateRoutes = ({ isAdmin, ...props }) => {
    const history = useHistory()
    useEffect(() => {
        if (isAdmin) {
            history.push('/')
        } else {
            history.push('/login')
        }
    }, [isAdmin, history])

    return (
        <React.Fragment>
            {isAdmin &&
                <React.Fragment>
                    <Topbar />
                    <div className="container">
                        <Sidebar />
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/users">
                            <UserList />
                        </Route>
                        <Route path="/user/:userId">
                            <User />
                        </Route>
                        <Route path="/newUser">
                            <NewUser />
                        </Route>
                        <Route path="/products">
                            <ProductList />
                        </Route>
                        <Route path="/product/:productId">
                            <Product />
                        </Route>
                        <Route path="/newproduct">
                            <NewProduct />
                        </Route>
                        <Route path="/orderlist">
                            <AllOrderHistory />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    )

}

export default App;
