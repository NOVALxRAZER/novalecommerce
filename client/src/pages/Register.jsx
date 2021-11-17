import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import styled from "styled-components"
import { mobile } from "../responsive"
import {register} from "../redux/apiCalls"
import { useRef } from "react"
// import axios from "axios"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255, 0.5), rgba(255,255,255, 0.5)), url("https://gadgetren.com/wp-content/uploads/2021/10/Razer-X-Genshin-Impact-.jpg") center;
    background-size: 100vw 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: #e5fae5;
    ${mobile({width: "75%"})}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Aggrement = styled.span`
    font-size: 15px;
    margin: 20px 0px;
`
const Link = styled.a`
    margin: 15px 60px;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
    color: inherit;
    justify-content: space-around;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: green;
    color: black;
    cursor: pointer;
`

export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post("http://localhost:8500/auth/register", {
    //             username: usernameRef.current.value,
    //             email: emailRef.current.value,
    //             password: passRef.current.value});
    //         history.push("/login");
    //     } catch (err) {}
    // }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            register(dispatch, { 
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passRef.current.value
            });
            history.push("/login");
        } catch (err) {}
    }
    
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="Username" ref={usernameRef}/>
                    <Input placeholder="Email" type="email" ref={emailRef}/>
                    <Input placeholder="Password" type="password" ref={passRef}/>
                    <Input placeholder="Confirm Password" type="password" ref={passRef}/>
                    <Aggrement>
                        By Creating an Account, I consent to the processing my Personal Data in accordance with the <b>PRIVACY POLICY</b>
                    </Aggrement>
                    <Button onClick={handleClick}>CREATE</Button>
                    <Link href="/login">Have an Account? Sign Up Now</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}
