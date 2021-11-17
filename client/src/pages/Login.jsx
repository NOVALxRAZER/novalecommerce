import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { login } from "../redux/apiCalls"
import { mobile } from "../responsive"
import { useHistory } from "react-router"


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255, 0.5), rgba(255,255,255, 0.5)), url("https://i2.wp.com/wowfakta.com/wp-content/uploads/2021/10/1633450814_Kolaborasi-Razer-X-miHoYo-Jangkau-Lebih-Banyak-Gamer-Genshin-Impact.jpg?fit=1080%2C720&ssl=1") center;
    background-size: 100vw 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #e5fae5;
    ${mobile({width: "75%"})}
`
const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 500;
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: green;
    color: black;
    margin-bottom: 10px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:disabled{
        cursor: not-allowed;
    }
`
const Link = styled.a`
    margin: 5px 0px;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
    color: inherit;
`
const Error = styled.span`
    color: red;
`
const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Or = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    font-weight: bold;
`
const Google = styled.div`
    background-color: red;
    border: none;
    width: 150px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 10px;
    cursor: pointer;
`

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
        history.push("/");
    };

    const google = () => {
        window.open("http://localhost:8500/auth/google", "_self")
    }
    
    return (
        <Container>
             <Wrapper>
                <Title>LOGIN TO YOUR ACCOUNT</Title>
                <Form>
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Center>
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    <Or>OR</Or>
                    <Google onClick={google}>Login With Google</Google>
                    </Center>
                    {error && <Error>Username or Password is Wrong</Error>}
                    <Link href="/register">Create a New Account</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}
