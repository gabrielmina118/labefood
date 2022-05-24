import { useState } from "react"
import { useGlobal } from "../../Context/Global/GlobalStateContext"
import ModalSelectQuantity from "../ModalSelectQuantity/ModalSelectQuantity"
import {
    BoxInform,
    BoxInformPriceButton,
    BoxNameQuantity,
    ContainerCardProduct,
    ImageProduct,
    InformButton,
    InformDescription,
    InformPrice,
    NameProduct,
    QuantityProduct
} from "./styled"

const CardProduct = ({ product, addItemCart, restaurant }) => {
    const [showModal, setShowModal] = useState(false)
    const { states, requests } = useGlobal()
    const addToCartQuantity = (quantity) => {
        addItemCart(product, quantity, restaurant)
        setShowModal(false)
    }
    const removeToCart = () => {
        requests.removeItemCart(product.id)
    }

    const productCart = states.cart.find((productCart) => productCart.id === product.id)
    return <ContainerCardProduct>
        <ImageProduct src={product.photoUrl} />
        <BoxInform>
            <BoxNameQuantity>
                <NameProduct>{product.name}</NameProduct>
                {productCart && <QuantityProduct>{productCart.quantity}</QuantityProduct>}
            </BoxNameQuantity>
            <InformDescription>
                {product.description}
            </InformDescription>
            <BoxInformPriceButton>
                <InformPrice>
                    {product.price}
                </InformPrice>
                {productCart ? <InformButton onClick={removeToCart} itIsInCart={productCart}>
                    Remover
                </InformButton>
                    : <InformButton onClick={() => setShowModal(true)} itIsInCart={productCart}>

                        Adicionar
                    </InformButton>
                }
            </BoxInformPriceButton>

            <ModalSelectQuantity addToCartQuantity={addToCartQuantity} open={showModal} setOpen={setShowModal} />
        </BoxInform>
    </ContainerCardProduct>
}
export default CardProduct