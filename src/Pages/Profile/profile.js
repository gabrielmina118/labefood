import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardOrderHistory from '../../Components/CardOrderHistory/cardOrderHistory'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import { BASE_URL } from '../../Constants/url'
import { useProtectedPage } from '../../Hooks/useProtectedPage'
import { useRequestData } from '../../Hooks/useRequestData'
import { goToProfileEdit, goToAdressEdit, goToLogin } from '../../Routes/coordinator'
import { Main, Perfil, Informacoes, PerfilPessoa, EnderecoPessoa, HistoricoCompras, OrderHistory, MainHistory, LogOutDiv } from './styled'
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
    useProtectedPage()

    const person = useRequestData({}, `${BASE_URL}/profile`)
    const order = useRequestData([], `${BASE_URL}/orders/history`)

    const navigate = useNavigate()


    const logOut = ()=>{
        window.localStorage.removeItem('token')
        goToLogin(navigate)
    }
  

    return (
        <Main>
            <Menu pageCurrent={"profile"} />
            <Header title={"Meu Perfil"} />
            <LogOutDiv onClick={()=>logOut()}>
                <LogoutIcon />
            </LogOutDiv>
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
                        {order[0].orders && order[0].orders.length > 0 ? order[0].orders && order[0].orders.map((order) => {
                            console.log(order)
                            return (
                                <CardOrderHistory
                                    restaurantName={order.restaurantName}
                                    totalPrice={order.totalPrice}
                                    createdAt={order.createdAt}
                                />
                            )
                        }) : <p>Voce nao realizou nenhum pedido.</p>}
                    </OrderHistory>
                </HistoricoCompras>
            </Informacoes>
        </Main>
    )
}
export default Profile


