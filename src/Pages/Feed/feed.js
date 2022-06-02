import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Constants/url'
import { BoxInputSearch, CardsRestaurant, ContainerFeed, InputSearch, Menu, MenuItem } from './styled'
import CardRestaurant from '../../Components/CardRestaurant/CardRestaurant'
import Header from '../../Components/Header/Header'
import MenuChangePage from '../../Components/Menu/Menu'
import { useGlobal } from '../../Context/Global/GlobalStateContext'
import PlaceCurrent from '../../Components/PlaceCurrent/PlaceCurrent'
import { useProtectedPage } from '../../Hooks/useProtectedPage'
const Feed = () => {

    useProtectedPage()

    const [restaurants, setRestaurants] = useState([])
    const [categoryRestaurant, setCategoryRestaurant] = useState([])
    const [valueCategory, setValueCategory] = useState('')
    const { setters, states } = useGlobal()

    const [inputText, setInputText] = useState('')


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
                filterCategory(res.data.restaurants)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const filterCategory = (restaurants) => {
        const arrayAux = []
        restaurants.map((res) => {
            arrayAux.push(res.category)
        })
        const takeOutRepeat = [...new Set(arrayAux)]
       
        const changeObjectArray = []

        takeOutRepeat.map((category)=>{
            const insertObj = {category,select:false}
            changeObjectArray.push(insertObj)
        })
 
        setCategoryRestaurant(changeObjectArray)
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
                console.log(err.response.data.message)
            })
    }
    useEffect(() => {
        getRestaurants()
        getActiveOrder()
    }, [])


    const filterRestaurant = restaurants
        .filter((restaurant) =>
            inputText ? restaurant.name.toLowerCase().includes(inputText.toLowerCase()) : true
        )
        .filter((restaurant) =>
            valueCategory ? restaurant.category.toLowerCase().includes(valueCategory.toLowerCase()) : true
        )
        .map((restaurant) => {
            return <CardRestaurant restaurant={restaurant} />
        })

        const changeCategory = (category)=>{
            setValueCategory(category)
            
            const result = categoryRestaurant.map((cat)=>{
                if(cat.category === category){
                    return{
                        ...cat,
                        select:true
                    }
                }else{
                    return{
                        ...cat,
                        select:false
                    } 
                }
            })
            setCategoryRestaurant(result);
        }

    return (

        <ContainerFeed>

            <Header title={"Ifuture"} />
            <BoxInputSearch>
                <InputSearch
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                />
            </BoxInputSearch>
            <Menu>
                <MenuItem

                    onClick={() => changeCategory('')}
                >
                    Todos
                </MenuItem>
                {categoryRestaurant.map((category) => {
                    return (
                        <MenuItem
                            select={category.select}
                            onClick={() => changeCategory(category.category)}
                        >
                            {category.category}
                        </MenuItem>
                    )
                })}

            </Menu>
            <CardsRestaurant>
                {
                    filterRestaurant
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