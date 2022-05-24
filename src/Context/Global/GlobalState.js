import { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
    const [cart, setCart] = useState([]);
    const [restaurant, setRestaurant] = useState({})
    const [order, setOrder] = useState(null)

    const addItemCart = (product, quantity, restaurantProduct) => {
        if (restaurant.id !== restaurantProduct.id) {
            setRestaurant(restaurantProduct)
            setCart([{ ...product, quantity }])
        } else {
            setCart([...cart, { ...product, quantity }])
        }
    }
    const removeItemCart = (id) => {
        const indexItem = cart.findIndex((prod) => prod.id === id)
        const newCart = [...cart]
        newCart.splice(indexItem, 1)

        setCart(newCart)
    }
 

    const states = { cart, restaurant, order };
    const setters = { setOrder };
    const requests = { addItemCart, removeItemCart };
    return (
        <GlobalStateContext.Provider value={{ requests, states, setters }}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};
export default GlobalState;
