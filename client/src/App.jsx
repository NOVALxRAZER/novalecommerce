import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null)
  const users = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8500/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if(users){
      setUser(users)
    }else{
      setUser(null)
    }
  }, [users])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user || users ? <Home /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/login">
          {!user || !users ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/register">
          {!user || !users ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        {(user || users) && (
          <Switch>
            <Route path="/product/:id">
              <Product />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
          </Switch>
        )}
      </Switch>
    </Router>
  );
};

export default App;