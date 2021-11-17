import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    height: 60vh;
    background-color: #e2ffe1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`
const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({textAlign: "center"})}
`
const InputContainer = styled.div`
    width: 30%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid green;
    ${mobile({width: "80%"})}
`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`
const Button = styled.button`
    flex: 1;
    cursor: pointer;
    border: none;
    background-color: green;
    color: black;
`

export default function Newsletter() {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get Any Information From Our Products.</Desc>
            <InputContainer>
                <Input placeholder="Your Email"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}
