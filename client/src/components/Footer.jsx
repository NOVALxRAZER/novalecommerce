import { Facebook, Instagram, MailOutline, Phone, Room, WhatsApp } from "@material-ui/icons"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: "column"})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1``
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

export default function Footer() {
    return (
        <Container>
            <Left>
                <Logo>RAZER x GENSHIN</Logo>
                <Desc>
                    Dear Travelers, Genshin Impact and Razer's collaboration is about to launch!
                    This month, Razer will be releasing a range of Paimon-themed gear: including an ergonomic gaming chair, an ergonomic wireless gaming mouse, and a mouse mat.
                    And to sweeten the deal, each co-branded product will come with a gift code, which can be redeemed for bonus in-game rewards! Don't miss it, Travelers~
                </Desc>
                <SocialContainer>
                    <SocialIcon color="009BFF">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="FF8585">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="92FF37">
                        <WhatsApp/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Gaming Gear</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Terms</ListItem>
                    <ListItem>Contact Us</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact Us</Title>
                <ContactItem><Room style={{marginRight:"10px"}}/> Jl. Kemanggisan Raya, Binus University</ContactItem>
                <ContactItem><Phone style={{marginRight:"10px"}}/> +62 877 8888 9999</ContactItem>
                <ContactItem><MailOutline style={{marginRight:"10px"}}/> razerzone@razer.com</ContactItem>
                <Payment src="https://mly6zbhur6xq.i.optimole.com/K45bKQk-cgTv-fZz/w:1024/h:222/q:auto/https://manocodes.com/wp-content/uploads/2020/07/Semua-Logo-Pembayaran-Transparant.png" />
            </Right>
        </Container>
    )
}
