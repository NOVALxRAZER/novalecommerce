import { Add, Remove } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from 'react'
import { userRequest } from '../requestMethods'
import { useHistory } from 'react-router'

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=> props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "green" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({display: "none"})}
`
const TopText = styled.span`
    text-decoration: underline;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
    height: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin: "5px 15px"})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 300;
    ${mobile({marginBottom: "20px"})}
`
const Hr = styled.hr`
    background-color: lightgreen;
    border: none;
    height: 1px;
    margin: 20px 0px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgreen;
    border-radius: 10px;
    padding: 20px;
    height: 35vh;
`
const SummaryTitle = styled.h1`
    font-weight: 400;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: green;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

export default function Cart() {
    const cart = useSelector(state => state.cart)
    const quantity = useSelector(state => state.cart.quantity);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    const onToken = token => {
        setStripeToken(token);
    };
    
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 100,
                });
                history.push("/success", {
                    stripeData: res.data,
                    products: cart,
                });
            } catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history, cart]);
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>SHOPPING BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag ({quantity})</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product => ( 
                        <Product key={product._id}>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><b>Product : </b>{product.title}</ProductName>
                                    <ProductId><b>ID : </b>{product._id}</ProductId>
                                    <ProductColor color={product.color}/>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove cursor="pointer"/>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Add cursor="pointer"/>
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                        ))}
                        <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Price</SummaryItemText>
                            <SummaryItemPrice>$ 6.9</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Voucher</SummaryItemText>
                            <SummaryItemPrice>$ -6.9</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout 
                            name="RAZER x GENSHIN"
                            image="https://www.nicepng.com/png/full/177-1779468_razer-logo-png-razer-minimalist.png"
                            billingAddress
                            shippingAddress
                            description={`Your Total Billing is $ ${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}
