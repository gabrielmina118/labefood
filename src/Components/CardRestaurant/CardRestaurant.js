import { BoxInformTimePrice, ContainerCardRestaurants, ImageRestaurant, InformTimePrice, NameRestaurant } from "./styled"

const CardRestaurant = ({ restaurant }) => {
    console.log(restaurant)
    return <>
        <ContainerCardRestaurants>
            <ImageRestaurant src={restaurant.logoUrl} alt={`Logo ${restaurant.name}`}/>
            <NameRestaurant>{restaurant.name}</NameRestaurant>
            <BoxInformTimePrice>
                <InformTimePrice>{restaurant.deliveryTime}</InformTimePrice>
                <InformTimePrice>{restaurant.shipping}</InformTimePrice>
            </BoxInformTimePrice>
        </ContainerCardRestaurants>
    </>
}

export default CardRestaurant