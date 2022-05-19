import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Constants/url'
import { useProtectedPage } from '../../Hooks/useProtectedPage'
import { useRequestData } from '../../Hooks/useRequestData'
import { goToProfileEdit , goToAdressEdit } from '../../Routes/coordinator'
import {Main,Perfil,Informacoes,PerfilPessoa,EnderecoPessoa,HistoricoCompras} from './styled'


const Profile = () => {
    useProtectedPage()

    const person = useRequestData({},`${BASE_URL}/profile`)

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
                    <div onClick={()=> goToProfileEdit(navigate,person[0].user.id)}>Editar</div>
                </PerfilPessoa>
                <EnderecoPessoa>
                    <div>
                        <h4>Endereço cadastrado</h4>
                        <p>{person[0].user && person[0].user.address}</p>
                    </div>
                    <div onClick={()=> goToAdressEdit(navigate,person[0].user.id)}>Editar</div>
                </EnderecoPessoa>
                <HistoricoCompras>HistoricoCompras</HistoricoCompras>
            </Informacoes>
        </Main>
    )
}
export default Profile


