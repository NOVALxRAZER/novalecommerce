import { Badge } from '@material-ui/core'
import { ShoppingCartOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import {mobile} from "../responsive"
import {useSelector} from "react-redux"
import {Link, useHistory} from "react-router-dom"
import { userLogout } from '../redux/apiCalls'
import { useEffect, useState } from 'react'

const Container = styled.div`
    height: 60px;
    background-color: green;
    ${mobile({height: "50px"})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding: "10px 0px"})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "16px"})}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: 2, justifyContent: "center"})}
`
const UserItem = styled.span`
    margin-right: 20px;
    font-size: 20px;
    font-weight: 500;
`
const UserImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const MenuItem = styled.div`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    margin-left: 20px;
    margin-right: 20px;
    ${mobile({fontSize: "12px", marginLeft: "10px"})}
`

export default function Navbar() {
    const quantity = useSelector(state => state.cart.quantity);
    const history = useHistory();
    const myStorage = window.localStorage;
    const player = useSelector(state => state.user.currentUser);
    const [user, setUser] = useState(null);

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
    
    // console.log(user);

    const handleClick = () => {
        myStorage.removeItem("persist:root");
        userLogout();
        history.push("/login");
    }

    const handleLogout = () => {
        window.open("http://localhost:8500/auth/logout", "_self");
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    
                </Left>
                <Center><Link to="/" style={{textDecoration:"none", color:"inherit"}}><Logo>RAZER x GENSHIN</Logo></Link></Center>
                <Right>
                    {user || player ? (
                        <>
                            <UserImage src={user?.image}/>
                            <UserItem>{user?.displayName || player?.username}</UserItem>
                            {user ? (
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            ) : (
                                null
                            )}
                            {player ? (
                                <Link to="/login" style={{textDecoration:"none", color:"black"}}>
                                    <MenuItem onClick={handleClick}>Logout</MenuItem>
                                </Link>
                            ) : (
                                null
                            )}
                        </>
                    ) : (
                        <Link to="/login" style={{textDecoration:"none", color:"black"}}>
                            <MenuItem>Login</MenuItem>
                        </Link>
                    )}
                    <Link to="/cart" style={{textDecoration:"none", color:"black"}}>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}
