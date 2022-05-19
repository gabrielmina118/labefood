import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardOrderHistory from '../../Components/CardOrderHistory/cardOrderHistory'
import { BASE_URL } from '../../Constants/url'
import { useProtectedPage } from '../../Hooks/useProtectedPage'
import { useRequestData } from '../../Hooks/useRequestData'
import { goToProfileEdit, goToAdressEdit } from '../../Routes/coordinator'
import { Main, Perfil, Informacoes, PerfilPessoa, EnderecoPessoa, HistoricoCompras, OrderHistory, MainHistory } from './styled'


const Profile = () => {
    useProtectedPage()

    const person = useRequestData({}, `${BASE_URL}/profile`)
    const order = useRequestData([],`${BASE_URL}/orders/history`)

    const navigate = useNavigate()

    return (
        <Main>
            <Perfil>Meu Perfil</Perfil>
            <Informacoes>
                <PerfilPessoa>
                    <div>
                        <p>{person[0].user && person[0].user.name}</p>
                        <p>{person[0].user && person[0].user.email}</p>
                        <p>{person[0].user && person[0].user.cpf}</p>
                    </div>
                    <div onClick={() => goToProfileEdit(navigate, person[0].user.id)}>Editar</div>
                </PerfilPessoa>
                <EnderecoPessoa>
                    <div>
                        <h4>Endereço cadastrado</h4>
                        <p>{person[0].user && person[0].user.address}</p>
                    </div>
                    <div onClick={() => goToAdressEdit(navigate, person[0].user.id)}>Editar</div>
                </EnderecoPessoa>
                <HistoricoCompras>
                    <MainHistory>
                        <p>Histórico de pedidos</p>
                    </MainHistory>
                    <OrderHistory>
                        {order[0].orders && order[0].orders.map((order)=>{
                            console.log(order)
                           return(
                            <CardOrderHistory 
                            restaurantName={order.restaurantName}
                            totalPrice={order.totalPrice}
                            createdAt={order.createdAt}
                            />
                           )      
                        })}
                    </OrderHistory>
                </HistoricoCompras>
            </Informacoes>
        </Main>
    )
}
export default Profile


