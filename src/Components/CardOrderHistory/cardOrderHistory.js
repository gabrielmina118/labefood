import React from "react"
import styled from 'styled-components'

const Main = styled.div`
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 5px;
    border: 1px solid black;
    border-radius:30%;
`

const CardOrderHistory = (props) =>{
    return(
        <Main>
            <p>Nome do restaurante</p>
            <p>data de entrega</p>
            <p>subtotal : R$ 00,00</p>
        </Main>
    )
}

export default CardOrderHistory