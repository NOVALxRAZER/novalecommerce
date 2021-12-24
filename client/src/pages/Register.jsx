import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";
import { useHistory } from "react-router"
import TextField from '@mui/material/TextField';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255, 0.5), rgba(255,255,255, 0.5)), url("https://gadgetren.com/wp-content/uploads/2021/10/Razer-X-Genshin-Impact-.jpg") center;
    background-size: 100vw 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({width: "111%"})}
`
const Wrapper = styled.div`
    border-radius: 10px;
    width: 400px;
    padding: 20px;
    background-color: #e5fae5;
    ${mobile({width: "75%"})}
`
const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Form = styled.div`
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Span = styled.span`
    font-size: 15px;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 5px;
    color: #636363;
`
const Link = styled.a`
    margin: 15px 60px;
    font-size: 15px;
    cursor: pointer;
    color: inherit;
    justify-content: space-around;
`
const Button = styled.button`
    width: 200px;
    height: 45px;
    border: none;
    padding: 15px 20px;
    background-color: #039e03;
    color: white;
    margin-bottom: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-left: 100px;
    border-radius: 5px;
    cursor: pointer;
`
const LoginButton = styled.button`
    background-color: blue;
    border: none;
    width: 250px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 15px;
    margin-left: 75px;
    cursor: pointer;
`

export default function Register() {
    const [nama, setNama] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [errors, setErrors] = useState({nama});
    const [errors1, setErrors1] = useState({mail});
    const [errors2, setErrors2] = useState({pass});
    const [errors3, setErrors3] = useState({confPass});
    const [values, setValues] = useState({
        username: '',
        email: '',
        tanggal: '',
        password: '',
        confirmPassword: ''
    });
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        setErrors({ nama: '' })
        setNama(e.target.value);
        let reg = new RegExp(/^[A-Za-z0-9]{4,12}$/).test(e.target.value)
        if(!reg){
            setErrors({ nama: 'Username should be only 4-12 Characters and/or Numbers' })
        }
    }

    const handleChange1 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        setErrors1({ mail: '' })
        setMail(e.target.value);
        let reg1 = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(e.target.value)
        if(!reg1){
            setErrors1({ mail: "Email should be a Valid Email and containt 1 '@ + .com' Character" })
        }
    }

    const handleChange2 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        setErrors2({ pass: '' })
        setPass(e.target.value);
        let reg2 = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/).test(e.target.value)
        if(!reg2){
            setErrors2({ pass: "Password should be 6-16 characters, and atleast containt 1 Number" })
        }
    }

    const handleChange3 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        setErrors3({ confPass: '' })
        setConfPass(e.target.value);
        if(e.target.value !== pass){
            setErrors3({ confPass: "Password doesn't match!" })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!values.username){
            setErrors({ nama: "Username is Required" })
        }if(!values.email){
            setErrors1({ mail: "Email is Required" })
        }if(!values.password){
            setErrors2({ pass: "Password is Required" })
        }if(!values.confirmPassword){
            setErrors3({ confPass: "Confirm Password is Required" })
        }if(values.username && values.email && values.password && values.confirmPassword){
            register(dispatch, { 
                ...values,
            });
            history.push("/login");
        }
    };
    
    return (
        <Container>
            <Wrapper>
                <Title>Create an Account</Title>
                <Form>
                    <Span>Username</Span>
                    <TextField 
                        label="Username"
                        id="outlined-basic"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        required
                        error={Boolean(errors?.nama)}
                        helperText={(errors?.nama)}
                    />
                    <Span>Email</Span>
                    <TextField 
                        label="Email"
                        id="outlined-basic"
                        type="email"
                        name="email"
                        onChange={handleChange1}
                        required
                        error={Boolean(errors1?.mail)}
                        helperText={(errors1?.mail)}
                    />
                    <Span>Password</Span>
                    <TextField 
                        label="Password"
                        id="outlined-basic"
                        type="password"
                        name="password"
                        onChange={handleChange2}
                        required
                        error={Boolean(errors2?.pass)}
                        helperText={(errors2?.pass)}
                    />
                    <Span>Confirm Password</Span>
                    <TextField 
                        label="Confirm Password"
                        id="outlined-basic"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange3}
                        required
                        error={Boolean(errors3?.confPass)}
                        helperText={(errors3?.confPass)}
                    />
                </Form>
                <Button  onClick={handleSubmit}>CREATE</Button>
                <Link href="/login" style={{textDecoration:"none"}}>
                    <LoginButton>Have an Account? Login Now!</LoginButton>
                </Link>
            </Wrapper>
        </Container>
    )
}