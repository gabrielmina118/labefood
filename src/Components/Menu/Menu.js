import { useNavigate } from "react-router-dom"
import { goToCart, goToFeed, goToProfile } from "../../Routes/coordinator"
import { AvatarStyled, CartStyled, HomeStyled, MenuContainer, MenuContainerSpace } from "./styled"

const Menu = ({pageCurrent}) => {
    const navigate = useNavigate()
    return <>
    <MenuContainer>
        <HomeStyled  pageCurrent={pageCurrent === "home"} onClick={() => goToFeed(navigate)}/>
        <CartStyled  pageCurrent={pageCurrent === "cart"} onClick={() => goToCart(navigate)}/>
        <AvatarStyled pageCurrent={pageCurrent === "profile"} onClick={() => goToProfile(navigate)}/>
    </MenuContainer>
    </>
}
export default Menu