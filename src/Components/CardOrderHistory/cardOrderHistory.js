import React from "react"
import styled from 'styled-components'

const Main = styled.div`
    min-height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 5px;
    border: 1px solid black;
    border-radius:30%;
    font-size: 2rem;
    padding:10px;
    p:nth-child(1){
        color: red;
    }
`

const convertDate = (timeStamp)=>{
    let time = new Date(timeStamp)
    let day = time.getDate().toString().padStart(2,'0')
    let month = (time.getMonth()+1).toString().padStart(2,'0')
    let year = time.getFullYear()

    return `${day}/${month}/${year}`
}


const CardOrderHistory = (props) =>{
    return(
        <Main>
            <p>{props.restaurantName}</p>
            <p>{convertDate(props.createdAt)}</p>
            <p>subtotal :{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(props.totalPrice)}
            </p>
            
        </Main>
    )
}

export default CardOrderHistory