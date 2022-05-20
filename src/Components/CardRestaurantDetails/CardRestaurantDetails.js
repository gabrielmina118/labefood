import { useNavigate } from "react-router-dom"
import { goToRestaurant } from "../../Routes/coordinator"
import { BoxInformTimePrice, ContainerCardRestaurantDetailss, ImageRestaurant, Inform, InformTimePrice, NameRestaurant } from "./styled"

const CardRestaurantDetails = ({ restaurant }) => {
    const navigate = useNavigate()
    return <>
        <ContainerCardRestaurantDetailss onClick={() => goToRestaurant(navigate, restaurant.id)}>
            <ImageRestaurant src={restaurant.logoUrl} alt={`Logo ${restaurant.name}`}/>
            <NameRestaurant>{restaurant.name}</NameRestaurant>
            <Inform>{restaurant.category}</Inform>
            <BoxInformTimePrice>
                <Inform>{restaurant.deliveryTime}</Inform>
                <Inform>{restaurant.shipping}</Inform>
            </BoxInformTimePrice>
            <Inform>{restaurant.address}</Inform>
        </ContainerCardRestaurantDetailss>
    </>
}

export default CardRestaurantDetails
