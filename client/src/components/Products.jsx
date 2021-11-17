import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
// import { popularProducts } from "../data"
import Product from "./Product"
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function Products({cat, filters, sort}) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async (req, res) => {
            try {
                const res = await axios.get( cat ? `http://localhost:8500/products?category=${cat}` : "http://localhost:8500/products");
                setProducts(res.data);
            } catch (err) {}
        };
        getProducts()
        return () => setProducts([])
    }, [cat]);

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item => 
                Object.entries(filters).every(([key, value]) => 
                    item[key].includes(value)
                )
            )
        );
    }, [products, cat, filters]);

    useEffect(() => {
        if((sort==="newest")){
            setFilteredProducts((prev) => 
                [...prev].sort((a,b) => a.createdAt - b.createdAt)
            );
        }else if((sort==="asc")){
            setFilteredProducts((prev) => 
                [...prev].sort((a,b) => a.price - b.price)
            );
        }else{
            setFilteredProducts((prev) => 
                [...prev].sort((a,b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (
        <Container>
            {cat 
                ? filteredProducts.map((item,index) => <Product item = {item} key={index}/>)
                : products.slice(0,8).map((item,index) => <Product item = {item} key={index}/>)}
        </Container>
    )
}
