import styled from "styled-components";
import { ReactComponent as Avatar } from './../../Assets/avatar.svg'
import { ReactComponent as Home } from './../../Assets/homepage.svg'
import { ReactComponent as Cart } from './../../Assets/shopping-cart.svg'

export const MenuContainer = styled.nav`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    height: 3.062rem;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14);
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: white;

`
export const MenuContainerSpace = styled.div`
    height: 3.062rem;
`
export const AvatarStyled = styled(Avatar)`
    fill: ${p => p.pageCurrent ?  "red": "#B8B8B8"};
`
export const HomeStyled = styled(Home)`
    fill: ${p => p.pageCurrent ?  "red": "#B8B8B8"};
`
export const CartStyled = styled(Cart)`
    fill: ${p => p.pageCurrent ?  "red": "#B8B8B8"};
`