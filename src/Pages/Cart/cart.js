import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardCart from '../../Components/CardCart/cardCart'
import { BASE_URL } from '../../Constants/url'
import { useRequestData } from '../../Hooks/useRequestData'
import { Main, MainCart, CartConfig, InfoProfile, CartInfo, Payment, InfoRestaurant, EmptyCart, Freight, Total, Form } from './styled'

const Cart = () => {


    const profile = useRequestData({}, `${BASE_URL}/profile`)
    const [payment, setPayment] = useState([])
    const [fullPrice, setFullPrice] = useState(0)

    const [paymentMethod, setPaymentMethod] = useState({
        'money': false,
        'creditcard': false
    })

    const mockData = {
        place: [
            {
                name: 'Stencil',
                price: 40,
                photoUrl: 'https://i.pinimg.com/474x/bc/db/d1/bcdbd1fcd7c6710dd5651b023ed72195.jpg',
                amount: 2,
                description: 'Pao, carne , queijo , cebola roxa , alface e molho'
            },
            {
                name: 'Cheese fries',
                price: 20,
                photoUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBISEhMWFhIVFxcZFRgYFhATFRUWGBUWFxcVFRUYHSggGBolGxYYITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy8lHyUvLy8zLS0vLy0tLTIyLy8tLS0tLy0tLS0tLS8wLysvLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcCAQj/xABCEAACAQIEAgcEBgcHBQAAAAAAAQIDEQQSITEFQQYTIlFhcYGRobHBBxQyQmLRIzNSouHw8RZDU1RygrIkY3PC0v/EABoBAQACAwEAAAAAAAAAAAAAAAAEBQECAwb/xAAzEQACAQIDBQcEAQQDAAAAAAAAAQIDEQQhMRJBUWHwBXGBkaGx0RMUIsHxFTJC4SNSgv/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD42RJ42Keqe5yq1qdK227XNoxctCYD5LYxxntrozaVRRkoswkYsbiurV7XPHDcX1sXK3O3uRD6RytBH3gVSMaMdd3d+DelvcVH3U12hKnKVoJaZatJ9/EkfTX0dq2dyxxGKjDc+qsnFSXPYicVhdJmGlWapRS5X9l38jeeNqQr1IS/tSurLPd65mqppwTWtyVhcVmnOD+7Zr5nvFYrJbS/IqOGN9a5X5O/q1Zfz3GbHYnLlfNNe4h/1Kawm05WbbzyeW1w8bW5HR0V9Sy5exbUKilFSXMylLU4g1laej1Jk8VfVO0UWFLtOk1Z6q3DPLXXTjmcpUZInAruHYmVRyb+ytn493iWJNw9eNemqkb2fHryOc4uLswADsagAAAAAAAAAAAAAAAAAEbE4pQ05nyhic3g+Wu55xdODd5XKnK1Ne58v4FHi8bXw9a7s430Vr+O+/DmSYU4zjzLPDYxSTT9Ssx83FyvpbbezI+OutYvyaJmIjnpp+C9Cp+7nXp7FR5w38Vpnb/y1bfrkSFTUGpLRnuOPbpK2jWhOozzRjLwXtNdoys8r2f8AKJkMWoKnH7zzJ67Wenx9bHShi5qo3Vd0or0aWXnfze4xOjl+K6szLxyOadBP7LbbXekr2+RWYfGtSlSUMq1a305vf1LXEVLuL3spWfn4ehW0f1j53i0n6HLHVNuq5L/K3qkvHz39x0o22NlrT5ZaYetnpZfvRduW3L0MyoRjBpy33/gROF4dRzSbTk9FbWy39v5Hus89232FovxPn6HeMrUoynFOezaz4Le7Pha+udks2kcZJbTUXl10iD9cjQTekpNtNp6paWXhuesBUWIqqVuyr6Pw019Su4pSVk4qyblfz0JfR3EqnRqWXbzb/wA+vtIuGlCVRKq/whnbjZaLe23m888yVOC+m5R/ueXn7HmUmrRe6uWzw08qbaSS1Tvt8iFhYLO6stors+Mnr7tzzDiOabTd0k3bv1SXxOeGjGEfzu29Fe1kt73+HBcJI0qXk/x3alvgK1lZrLH7ulnbxJlPERk7J6mvvG7vwLLg0bqU35L5l9gcZUnKNKOa4vW3XwRKtJJOTLQAF4RQAAAAAAAAAAAAAAAeXJI9GHER0uuRpUk4xbRlamLHUXKN1uuXeV2Im4Wj3a+ZMo4m0sr5rTuKzikrxUvQ852jOFSm6tJ2nvtutb5XJ25sl0Yu6jLQx4myf4Xr7T7Rr5VbeL08v4karVzUr846ejK2njctRLk9Ciu4z2oZb+uW5k6NJyjYuamDlOSUded+Xqz5xThcko1Mybiu0lu0r6ryJPD66y6a3b/oVfG8W8skn4fmTX9KNFNq8nz09M7Lic6e26myvYrcRxF5IL7rl8nv7Cy4XH9HKo+d1D5v5e0pIYbrHSgna8t+60W7m2cNjB37KyxtGCdntu7fzuznRpqTSvx6+FxtwzkYlqMcus/37XIeH4hlUv8ATp53/qYYY1tKKTb2stXfwRk4+4LWKtJW20T818yvhQqwcK1tLqW6ule/aXK/zNHGW1s7V0srrhe76zXM1hCMo7WjfHjYs6eElWpWWju9Xz1d1bcpMdSqUmsOmnOpJZUud9O1zW3sNjWOjU0lo7aSWjX5muYZShiKlWt+sStBXTSUl9pNd6+Z2lClGN1muO/uatZeDeRmhKX5X3Z29v8AZdYtt2pw1aXgrvm9TXqWIkq1RSTi1o091bk/iX2Dn2HN7y28l/H4FLx+aVSM+co2fjbb4nNWldvXrLy6zuZoqzcOrk3C1szsbbQrKnBRWqS3vu+djQ8HJ6N+aXwZs2Dpu15O0nsnvYlYKvOlJqOr38OXj+jhiqaepsWGrZ1e1jMYsPTyxUe4ynrqakora13lS7XyAANzAAAAAAAAAAAAAAABT4+jZNrl8CHiYp0P57y5x9lTlJ/dTenNJamuYeqqtOXVyUoxlr6q+q5czzWNwn0qknGN1KLXqvZexOoy2o57mVSr6SXgWtLDUcRRpykssl2bwsndaa8n3695qvFcR1bk299PeW3Q7Fuoq0eVoyXhLVNetv3StwsZK9lk/wBZlnWptU/qRdrfwWs0qMN7pLR7a8rrkyjxc3OKypuUtEkm23eysTeNzfVy/nb+pG6JyUsRHuhGcvdl/wDYwqf1KijuT8lvZrSWzTdTf1+yywXDKlOlKdWKTXaim1dWi03bybPFLF5ElfW2vnu/iSePYzJSnLwNGq8Sm29dWxUpJz/48kuLv+kZoU5Vk5S4myYNdfXSl9iN5S8UvzbS9pK4s+053dknmXusQOCVsinzb0b56d3q2y7w2HhWvKorxTTcf2nbZ+HM0jDbtDLrVvu+dd+Kstmd9yy67yiwM3KCkr2i7N8r91/IiY2rLrlFbzypeb0XvNi45j0oqkklHey0sltsa7GcZVqdTlTU35u1o+9t+hvKEIvJ3XNW66yNqU3JubVtflepc18Qk8q2VopLw09Sk4vw/EZpVasMlJNRWaUczXeorXV99tyfwCteu3zUW/a0j70uxealThf7dRX8Ek27GaEEk23mzEW6dVQiu9nvgNHP+lkuxH7P4mu7wX8C7hSlUkkt77lRgMSrRitIpJLw5JeLb+Ju2Ewqpq275snYLBfcPPKK159enEhYmtsyvv3GSjTyxSvey3MoB6hJJWRWAAGQAAAAAAAAAAAAAAAY6kM0Wns017ThM+P1sFiJ9W1dScZxavGST2a+e53o/O/0j4bquJ4iPKU1NeU4qXxbImLV4plr2VsynKEldNfv/ZK4hxxYiE7dmbT7PjurPnsbF9H2PUaUL6OUm5X5R+zb4+05jGZNw3E6kNpMpnQUY2hlncv6uD247MXkdq47StCXga30SxWXE1F/27fvRKyn9IPWRccRSWqs3B5b6W+zL8yBwHi9OGJlKU1GElu+WqsmcZUWpOUUQYYatCjKE458s/Y2vppiWqEmnu4r95Gr8EmquJpqX2VeUuekU3t52JXSziEKlFqnOMtU+zJPZrkiF0KpZpVqj2jFRXnO9/3Yv2o1jBKnKT5+yM0n9OjZ5PP4NnwWjfq2i4wmOSgmrWevtKPitZUaEpr7b0ivGWi97RT8T4vGn+jg7qCUb/6Ulf3EVUZSd0cnH6uhl43xfNiZW2Vo/P4s2Xo1wuLi5V4p30UW9vF28znGExK6zrKj1vdJau99zYP7X5IZKMPWbv65V+ZKdGV0orQk1MPVlBRpp9+nqbrOGHp1anUqzyRzq8na7lbd6bPbuNO6ZcRpzdKMJqWTM5W1s3lsu7kzXMRj6k3NuTvN3nZtKTWiuu5LRIgyZ3jRz2pemh1odnOEtqcrvrebJ0VxE62PwtO7yuom14QWd39IndDjf0TYPPjXVf8AdU5tecssfg2dkLrBR2aZSdsNfcbC3JfIABLKoAAAAAAAAAAAAAAAAAAHHvpqwCVajWS1nBp/7Hp/zOwml/ShwxVsLGfOnL3SVn70jjiF/wAbJeBqbFeL8PM4OfUZMRTyyaGHSzRvtdX9pUntovI8o9HU+JcB4fTlRhKjaVVtRac7X03ebTdFVhuh1L6/Gk80qDpyqWu01bs5XJfisRI4uEnstNZX7yHDtKlKO001k3mtba2zNDUj0qr/AGmb1xjo9gqFajKXZw88ylrN9pK8LOzf9C3qdFOGrDKvZ9W0pXz1LWel7WuFi4uO0k9OHO1tdeRvLtKlFRdpZ6Zb72trrkcv61959jI6D0f6MYKtUrTtmoqajS7Uo/dUt7JvtStqfKvA8DQxdWjWi7Pq3RV6j0ktVdePeHiYuLkk3bLTPRP0vn3M2/qNPacEpXSva3dlrqr6d5oUSTSidL4nwnh2Gpduj25qahbPLtJac9NWjJS6PUPquXqo9b1V81u1myt3v5mjxkFGLs/yOD7Up7KlstJu2dl4rM5lOJHbJ2M0IRMLFaHVPodw66qvU5uUY+yN/mjoxrP0fYPquH0e+d5v1f5JGzFxQVqaR4bHT28TOXP2yAAOxEAAAAAAAAAAAAAAAAAABW9IcN1mFrQ/C37NfkWR4nC6a71Yw1dWZlOzTPzVxvD5arIFNao2nprgXTrtdzaNbsUrTTsz3OGmpU4yOw8TxtGnHCTqwu5NKErKWSTitdduWq7jNw7AzWKrVnLMnTjGCslls23H22d/E1OHTPDSpUYVsPKUqSjZ2pySlGNsyvsSX0+pdXUtGpGo4yVPSDV7dlt301KR0akakWovg3u8OHPzKT7OuobMYvenvVr5Wzy5+Zk6QYGo+GR6yNqlLLJq6drNxeq/C7k3Ea8Cj/4Y/wDMoOGdLITw1anipzlOeZJ2zdmUUlfydy5+st8IVHqq3WdUl+pq5b5r3UrWtY6UozhGUZq2bfLPhy9iRUp1I7MZrSonfdbfbke+BYOpHAUFTi5TlOFRpWWnWKber/ZSMfT7C/8AWYSp+1KEX/tmmv8Akz5xbi1ZUKSwcaycbXfU1P1ahZWvHXk9D1xTiH1qjhpwpVpTjUpybyWTlGP6RJ83o/Ycac2obT1cn6prM1pxqKsqzSs3K/FXyz4LLLxJvSjDdbUwUOTqSv5LI37ky+wtGXXuTtkcYxS53Tk3p6lPjsbllTxEqFVU6SmrtUl2qmWMdM9+/wBpW43jFfC4nr6kG6dRNQg5rTSO9rpP8zNKm26V9El7pu3OyIypTq04wjbJSWqzd22tdbWfI0njdHJVqQ7pSXsbRBw1Jymorm0va7FhxvGdfXqVcuXPJu172v4lj0O4X1mKw99pTvbnaOrZcwi3ZI9E6rp0duWqV/G13+ztXDaHV0acF92EV7ESwC+SsrI8DqAAAAAAAAAAAAAAAAAAAAAAAAcr+k3h6WefPMpe3+pzRo7b9IWDz0nZayi16rY42sLKTkktYptrRPR2ej5+BWYtbM7nq+yaydDN6ESx5aJVLDykpOMW1FXlZXsu9mFoistk0Y4rVHWuMVsuEw3/AFjw76lWiv7y0I/Db1OUIvOP8f8ArNPDwyZepja+bNm0Wuytt7yNVpbbXc17cctxHxNB1alO2ibu8nu4O50rhWbNg2qll1OtPNrPsRs0ueX5lHxivOGCqTjenP61PROzjepUurr1KKj0wy1MLU6r9RBxtm+1eKje9tNvExcV6TOtRnTVNRUqkql7uTWZt22XNshU8LOMIJr/ACu9NP31uIFLBVVUi5Ryyb04y555O/p3bZx1SqVcDSu8s0nJXdnaUW21z0TMXTijKWGU3vGs7c+zJNL5GuVel1WVSlVUaalTg4R7MmrPdu73INXjFWVOdNy7E5Z2rL7d1rffkbxwtS9N5fil759bzpRwdWLg3b8fl305eZAN++jnD5sVTf8Ah0pSfnJ2XxNBgjrP0cYa3Xz7slNf7Y6+8usNG9RG/a09nDy64L9m8AAtjxwAAAAAAAAAAAAAAAAAAAAAAABSdK6Oag33fNHMKuCkozqyazKDjd/e7UZQnfvVmmdd4tSzUai8PgccqcRjTxLoyu4SaUov7rldXj3q19PMq+0qcpRTju9iywcvwaI8sA6cKlpJKrKKvfsxp/abfhfQicSwNOU3Cg4uMIq8m9akna9n8vMvanD3nhTnrSSundOMrOyu/Dc8cTp0YwnReWGdpOShmk3F6ZEt9VvcqIVM1+us8izhiHGW1e+/2WfE13GcIdKU1UnHspNNdpScl2Yxb38e4rLF5xLBVIZOub6qKup2WsX3R5PlZkHG0qMUlTqOcr69m0UuSTv2pd9tCVCV+fdoWWGxG1ZTd2+HWXMgpGVHlI9pG7LAHtHg9oGGSMElnhfa6v5XO0dAqVsJn/xJzl6XsvgcXoLU710dw/V4ShDmqcb+bV38Sbg1+TZQduytTiuL9izABYnmAAAAAAAAAAAAAAAAAAAAAAAADxOF013qxxXpvhasKk5Rp5o05OM8qXWQUtcy5taX8LdzZ20oON8CdWTnBpSklGV7paXtLRb62I2LhOVP8Fd8OPH0JOGqKMmpOyZxrhvGoyoOEnK8FpJRtB62tKXe9H5pkzDUctR1JZJqCjlnmu5ZkmsivtrbbQ32H0c0XmdSbvJWn1cVTzK97Su2pa87Evh30c4Gjqo1JP8AFUk17FZFe8BNptK19179+a68ia8ZTWV7+BoipwxubrJtU4apq2rW8nfkuSNd4tgVRnljNTg1eLjs18mdvodEcFB5o0bPwlUS9UnZnqt0SwU3eWHpt9/aXwZmn2fUi/7lbh0jrhu1IUZaO3DL+TgSR6O8f2NwH+Wh+/8Amff7HYD/AC1P978zt9nPivUsP69R/wCsvT5ODWPSO6voZgP8tD0c18GYpdBeHv8AuEvKdX/6H2c+KC7ew++MvJfJx3htHPVhBbuUV7WkfoSnGySWyVvYaxhOgmEpVYVafWJwkpJOSlFtd91f3m1ErD0pU07lT2pjaeJlH6d7K+vF/wAIAAkFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=',
                amount: 2,
                description: 'Pao, carne , queijo , cebola roxa , alface e molho'
            }
        ],
        "shipping": 6
    }

    const totalPrice = () => {
        let totPrice = 0;
        let item;
        if (mockData && mockData.shipping) {
            for (const product of mockData.place) {
                totPrice += product.price * product.amount
            }

            setFullPrice(totPrice)
        }

    }

    useEffect(() => {
        totalPrice()
    }, [])

    const onChangePayment = (event) => {
        const newCheck = { ...paymentMethod }
        newCheck[event.target.name] = event.target.checked

        const result = Object.keys(newCheck).filter((pay) => {
            if (newCheck[pay]) {
                return [pay, ...payment]
            }
        })

        setPayment(result)
        setPaymentMethod(newCheck)
    }

    const placeOrder = async () => {

        const body = {

        }

        await axios.post(`${BASE_URL}/restaurants/1/order`, body, {
            headers: {
                auth: window.localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const onSubmitPlaceOrder = (event) => {
        event.preventDefault()

    }

    return (
        <Main>
            <MainCart>
                <p>Meu Carrinho</p>
            </MainCart>
            <CartConfig>
                <InfoProfile>
                    <p>Endereço de entrega</p>
                    <p>{profile[0].user && profile[0].user.address}</p>
                </InfoProfile>
                <InfoRestaurant>
                    <p>Nome do restaurante</p>
                    <p>Rua do restaurante</p>
                    <p>30 - 45 min</p>
                </InfoRestaurant>
                <CartInfo>
                    {mockData.shipping && mockData.place.length > 0 ? mockData.place.map((data) => {
                        return (
                            <CardCart
                                name={data.name}
                                price={data.price}
                                photoUrl={data.photoUrl}
                                amount={data.amount}
                                description={data.description}
                            />
                        )
                    }) : <EmptyCart>Carrinho vazio</EmptyCart>}

                </CartInfo>
                <Payment>
                    <Freight>Frete {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(mockData.shipping ? mockData.shipping : 0)}</Freight>
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
                        {Object.keys(paymentMethod).map((key) => {
                            const checked = paymentMethod[key]
                            return (
                                <div key={key}>
                                    <input
                                        checked={checked}
                                        name={key}
                                        id={key}
                                        type={'checkbox'}
                                        onChange={onChangePayment}
                                    />
                                    <label>{key}</label>
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