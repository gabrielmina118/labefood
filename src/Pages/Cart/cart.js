import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardCart from '../../Components/CardCart/cardCart'
import { BASE_URL } from '../../Constants/url'
import { useRequestData } from '../../Hooks/useRequestData'
import {
    Main,
    MainCart,
    CartConfig,
    InfoProfile,
    CartInfo,
    Payment,
    InfoRestaurant,
    EmptyCart,
    Freight,
    Total,
    Form
} from './styled'
import Menu from '../../Components/Menu/Menu'
import Header from '../../Components/Header/Header'
import { useGlobal } from '../../Context/Global/GlobalStateContext'
import CardProduct from '../../Components/CardProduct/CardProdut'
import { useProtectedPage } from '../../Hooks/useProtectedPage'
import { useNavigate } from 'react-router-dom'
import { goToFeed } from '../../Routes/coordinator'

const Cart = () => {

    useProtectedPage()
    const profile = useRequestData({}, `${BASE_URL}/profile`)
    const [payment, setPayment] = useState('')
    const [fullPrice, setFullPrice] = useState(0)
    const { states, setters } = useGlobal()
    const { cart, restaurant } = states
    const [paymentMethod] = useState([
        'money',
        'creditcard'
    ])


    const navigate = useNavigate()


    const totalPrice = () => {
        let totPrice = 0;
        for (const product of cart) {
            totPrice += product.price * product.quantity
        }
        setFullPrice(totPrice)
    }

    useEffect(() => {
        totalPrice()
    }, [])

    const onChangePayment = (event) => {
        setPayment(event.target.value)
    }

    const placeOrder = async () => {
        const body = {
            products: cart.map(({ id, quantity }) => {
                return { id, quantity }
            }),
            paymentMethod: payment
        }

        axios.post(`${BASE_URL}/restaurants/${restaurant.id}/order`, body, {
            headers: {
                auth: window.localStorage.getItem('token')
            }
        })
            .then((res) => {
                setters.setOrder(res.data.order)
                setters.setCart([])
                goToFeed(navigate)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const onSubmitPlaceOrder = (event) => {
        event.preventDefault()
        placeOrder()
    }

    return (
        <Main>
            <Menu pageCurrent={"cart"} />
            <Header title={"Meu carrinho"} />
            <CartConfig>
                <InfoProfile>
                    <p>Endereço de entrega</p>
                    <p>{profile[0].user && profile[0].user.address}</p>
                </InfoProfile>
                <InfoRestaurant>
                    <p>{restaurant.name}</p>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.deliveryTime} min</p>
                </InfoRestaurant>
                <CartInfo>
                    {cart && cart.length > 0 ? cart.map((product) => {
                        return (
                            <CardProduct
                                product={product}
                            />
                        )
                    }) : <EmptyCart>Carrinho vazio</EmptyCart>}

                </CartInfo>
                <Payment>
                    <Freight>Frete {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(fullPrice)}</Freight>
                    <Total>
                        <p>Subtotal</p>
                        <p>{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(fullPrice)}</p>
                    </Total>
                    <h1>Forma de pagamento</h1>
                    <hr />
                    <Form onSubmit={onSubmitPlaceOrder}>
                        {paymentMethod.map((method) => {
                            return (
                                <div key={method}>
                                    <input
                                        checked={payment === method}
                                        name={"paymentMethod"}
                                        id={method}
                                        type={'radio'}
                                        onChange={onChangePayment}
                                        value={method}

                                    />
                                    <label for={method} >{method}</label>
                                </div>
                            )
                        })}
                        <Button type='submit'>Confirmar</Button>
                    </Form>
                </Payment>
            </CartConfig>
        </Main>
    )
}
export default Cart