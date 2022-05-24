import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardProduct from '../../Components/CardProduct/CardProdut'
import CardRestaurantDetails from '../../Components/CardRestaurantDetails/CardRestaurantDetails'
import Header from '../../Components/Header/Header'
import { BASE_URL } from '../../Constants/url'
import { useGlobal } from '../../Context/Global/GlobalStateContext'
import { CardRestaurant, Category, ContainerRestaurant, SectionProductByCategory } from './styled'
const Restaurant = () => {
    const { restaurantId } = useParams()
    const [restaurant, setRestaurant] = useState({})
    const [categories, setCategories] = useState([])
    const { requests } = useGlobal()
    const getRestaurant = () => {
        axios.get(`${BASE_URL}/restaurants/${restaurantId}`, {
            headers: {
                auth: window.localStorage.getItem("token")
            }
        })
            .then((res) => {
                setRestaurant(res.data.restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getRestaurant()
    }, [])

    useEffect(() => {
        if (restaurant.products) {
            const newCategories = []
            for (const product of restaurant.products) {
                if (!newCategories.includes(product.category)) {
                    newCategories.push(product.category)
                }

            }
            setCategories(newCategories)
        }
    }, [restaurant])


    return (
        <ContainerRestaurant>
            <Header title={"Restaurante"} back />
            <CardRestaurant>
                <CardRestaurantDetails restaurant={restaurant} />
                {
                    restaurant.products
                    &&
                    categories.map((category) => {
                        return <SectionProductByCategory>
                            <Category>{category}</Category>
                            {
                                restaurant.products
                                    .filter((product) => {
                                        return product.category === category
                                    })
                                    .map((product) => {
                                        return <CardProduct restaurant={restaurant}
                                        addItemCart={requests.addItemCart}
                                            product={product}
                                            key={product.id} />
                                    })
                            }
                        </SectionProductByCategory>
                    })
                }
            </CardRestaurant>
        </ContainerRestaurant>
    )
}
export default Restaurant