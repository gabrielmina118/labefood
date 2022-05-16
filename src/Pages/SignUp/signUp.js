import React, { useState } from 'react'
import { useForm } from '../../Hooks/useForm'
import { ButtonStyled, InputMaterial, Main, PassDiv } from "./styled"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material";

const SignUp = () =>{

    const {form,onChange,clean} = useForm({
        "name": "",
        "email": "",
        "cpf": "",
        "password": ""
    })

    const [confirmPassword,setConfirmPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showCheckPass, setShowCheckPass] = useState(false)
    const [checkErrPass, setCheckErrPass] = useState(false)

    const cpfMask = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const handleClickShowPassword = () => {
        setShowPass(!showPass)
    }
    const handleClickShowCheckPassword = () => {
        setShowCheckPass(!showCheckPass)
    }

    const onSubmitForm = (event)=>{
        event.preventDefault()
        
        if(form.password !== confirmPassword){
            setCheckErrPass(true)
        }else{
            setCheckErrPass(false)
        }
    }

    return(
        <Main>
            <p>Cadastrar</p>
            <form onSubmit={onSubmitForm}>
                <InputMaterial
                    id="outlined-basic"
                    label={"Nome"}
                    name='name'
                    type={'text'}
                    placeholder={'Digite seu nome'}
                    variant="outlined"
                    value={form.name}
                    onChange={onChange}
                />
                <InputMaterial
                    id="outlined-basic"
                    label={'Email'}
                    name='email'
                    type={'email'}
                    placeholder={'Digite seu email'}
                    variant="outlined"
                    value={form.email}
                    onChange={onChange}
                    required
                />
                 <InputMaterial
                    id="outlined-basic"
                    label={'Cpf'}
                    name='cpf'
                    type={'text'}
                    placeholder={'Digite seu cpf'}
                    variant="outlined"
                    value={cpfMask(form.cpf)}
                    onChange={onChange}
                    required
                />
                 <PassDiv>
                    <InputMaterial
                        id="outlined-adornment-password"
                        label={'Password'}
                        name='password'
                        type={showPass ? 'text' : 'password'}
                        placeholder={'minimo 6 caracteres'}
                        inputProps={{ minLength: 6, title: "A senha deve conter no minimo 6 digitos" }}
                        value={form.password}
                        onChange={onChange}
                        required
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </PassDiv>
                <PassDiv>
                    <InputMaterial
                         error={checkErrPass}
                         helperText={checkErrPass ? 'Deve ser a mesma que a anterior.' : ''}
                        id="outlined-adornment-password"
                        label={'Confirmar'}
                        type={showCheckPass ? 'text' : 'password'}
                        placeholder={'minimo 6 caracteres'}
                        inputProps={{ minLength: 6, title: "A senha deve conter no minimo 6 digitos" }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCheckPassword}
                        edge="end"
                    >
                        {showCheckPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </PassDiv>
                <ButtonStyled type="submit">Entrar</ButtonStyled>
            </form>
        </Main>
    )
}
export default SignUp