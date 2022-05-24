import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Constants/url'
import { BoxInputSearch, CardsRestaurant, ContainerFeed, InputSearch, Menu, MenuItem } from './styled'
import CardRestaurant from '../../Components/CardRestaurant/CardRestaurant'
import Header from '../../Components/Header/Header'
import MenuChangePage from '../../Components/Menu/Menu'
import { useGlobal } from '../../Context/Global/GlobalStateContext'
import PlaceCurrent from '../../Components/PlaceCurrent/PlaceCurrent'
const Feed = () => {
    const [restaurants, setRestaurants] = useState([])
    const { setters, states } = useGlobal()
    const getRestaurants = () => {
        axios
            .get(`${BASE_URL}/restaurants`,
                {
                    headers: {
                        auth: window.localStorage.getItem("token")
                    }
                })
            .then((res) => {
                setRestaurants(res.data.restaurants)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getActiveOrder = () => {
        axios.get(`${BASE_URL}/active-order`,
            {
                headers: {
                    auth: window.localStorage.getItem('token')
                }
            }
        )
            .then((res) => {
                setters.setOrder(res.data.order)
                const timeCurrent = new Date().getTime()
                setTimeout(() => {
                    getActiveOrder()
                    console.log("oi")
                }, res.data.order.expiresAt - timeCurrent)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getRestaurants()
        getActiveOrder()
    }, [])
    console.log(states.order)
    return (
        <ContainerFeed>
            <Header title={"Ifuture"} />
            <BoxInputSearch>
                <InputSearch />
            </BoxInputSearch>
            <Menu>
                <MenuItem select={true}>Burger</MenuItem>
                <MenuItem select={false}>Asiática</MenuItem>
                <MenuItem select={false}>Massas</MenuItem>
                <MenuItem select={false}>Saudável</MenuItem>
                <MenuItem select={false}>Saudável</MenuItem>
                <MenuItem select={false}>Saudável</MenuItem>
            </Menu>
            <CardsRestaurant>
                {
                    restaurants.map((restaurant) => {
                        return <CardRestaurant restaurant={restaurant} />
                    })
                }
            </CardsRestaurant>
            {
                states.order &&
                <PlaceCurrent restaurantName={states.order.restaurantName} totalPrice={states.order.totalPrice} />
            }

            <MenuChangePage pageCurrent={"home"} />
        </ContainerFeed>
    )
}
export default Feed