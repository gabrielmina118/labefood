import { Button, TextField } from '@mui/material'
import styled from 'styled-components'

export const Main = styled.div`
    padding: 10px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    form{
        margin-top: 50px;
        display: flex;
        width: 90%;
        height: 50%;
        justify-content: space-evenly;
        flex-direction: column;
    }
    p{
        font-size: 2rem;
    }
`
export const InputMaterial = styled(TextField)`
    width: 100%;
`
export const ButtonStyled = styled(Button)`
    &&{
        color: #000;
        width: 100%;
        background-color: #E8222E;
        margin-top: 5px;
    }
    
`