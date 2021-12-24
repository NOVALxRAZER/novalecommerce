import styled from 'styled-components'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Title = styled.h1`
    align-items: center;
    display: flex;
    justify-content: center;
`

export default function Home() {
    return (
        <div>
            <Navbar/>
            <Slider/>
            <Title>
                Categories
            </Title>
            <Categories/>
            <Title>
                Products Available
            </Title>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}
