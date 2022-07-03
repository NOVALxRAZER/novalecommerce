import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 40vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: #02b902;
    margin-bottom: 20px;
    text-shadow: #000 0px 0px 3px;
`

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: green;
    cursor: pointer;
    font-weight: 600;
`

export default function CategoryItem({item}) {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
            <Image src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
    )
}
