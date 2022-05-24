import styled from "styled-components"

const ContainerPlaceCurrent = styled.div`
    height: 7.5rem;
    background-color: red;
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 3.062rem;
    padding: 1.5rem;
`
export const Space = styled.div`
    height: 7.5rem;
`

export const Info = styled.p`
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: #fff;
    padding: 0.25rem;
`
export const RestaurantName = styled.p`
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: #000;
    padding: 0.25rem;
`
export const TotalPrice = styled.p`
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    padding: 0.25rem;
`


const PlaceCurrent = ({ totalPrice, restaurantName }) => {
    return <>
        <Space />
        <ContainerPlaceCurrent>
            <Info>
                Pedido-em-andamento
            </Info>
            <RestaurantName>{restaurantName}</RestaurantName>
            <TotalPrice>
                SUBTOTAL R${totalPrice}
            </TotalPrice>
        </ContainerPlaceCurrent>
    </>

}
export default PlaceCurrent