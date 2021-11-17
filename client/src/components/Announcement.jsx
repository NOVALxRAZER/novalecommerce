import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: black;
    color: greenyellow;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

export default function Announcement() {
    return (
        <Container>
            BIG SALE! Use Code Voucher "RAZERxGENSHIN" For 50% Discount
        </Container>
    )
}
