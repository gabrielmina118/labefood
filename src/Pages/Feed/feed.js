import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Constants/url'
import { BoxInputSearch, CardsRestaurant, ContainerFeed, InputSearch, Menu, MenuItem } from './styled'
import CardRestaurant from '../../Components/CardRestaurant/CardRestaurant'
import Header from '../../Components/Header/Header'

const Feed = () => {
    const [restaurants, setRestaurants] = useState([])
    const getRestaurants = () => {
        axios
            .get(`${BASE_URL}/restaurants`,
                {
                    headers: {
                        auth: window.localStorage.getItem("token")
                    }
                })
            .then((res) => {
                console.log(res)
                setRestaurants(res.data.restaurants)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getRestaurants()
    }, [])
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
        </ContainerFeed>
    )
}
export default Feed