import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardRestaurantDetails from '../../Components/CardRestaurantDetails/CardRestaurantDetails'
import { BASE_URL } from '../../Constants/url'
import { CardRestaurant, ContainerRestaurant } from './styled'
const Restaurant = () => {
    const { restaurantId } = useParams()
    const [restaurant, setRestaurant] = useState({})
    const getRestaurant = () => {
        axios.get(`${BASE_URL}/restaurants/${restaurantId}`, {
            headers: {
                auth: window.localStorage.getItem("token")
            }
        })
            .then((res) => {
                setRestaurant(res.data.restaurant)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getRestaurant()
    }, [])
    return (
        <ContainerRestaurant>
            <CardRestaurant>
                <CardRestaurantDetails restaurant={restaurant} />
              
            </CardRestaurant>
        </ContainerRestaurant>
    )
}
export default Restaurant