import styled from 'styled-components'

export const Main = styled.div`
    display: flex;
    justify-content: space-between;
    height: 20%;
    margin: 10px;
    border: 1px solid black;
`

export const ImageCard = styled.img`
    height: 150px;
`
export const CardComponent = styled.div`
    height: 100%;
`
export const InfoCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1.2rem;
    padding:5px;
    div:nth-child(1){
        display: flex;
        justify-content: space-between;
        p:nth-child(2){
            width: 20%;
            text-align: center;
            border: 1px solid red;
            color: red;
        }
    }
    div:nth-child(2){
        width: 100%;
    }
    div:nth-child(3){
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
`
