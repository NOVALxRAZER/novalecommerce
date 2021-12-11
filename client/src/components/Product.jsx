import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 350px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1fff1;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
        transition: all 1s ease;
    }
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    width: 300px;
    height: 250px;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 1.5s ease;

    &:hover{
        background-color: #c7f5c7;
        transform: scale(1.1);
    }
`

export default function Product({item}) {
    return (
        <Container>
            <Circle/>
            <Image src={item.img}/>
            <Info>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                    <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>
        </Container>
    )
}
