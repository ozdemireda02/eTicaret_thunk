import { ActionTypes } from "../actionTypes";
import axios from "axios";

// aksiyon oluşturan fonksiyon
export const setLoading = () => {
    return {
        type:ActionTypes.SET_LOADİNG,
    };
};
export const setError = () => {
    return {
        type:ActionTypes.SET_ERROR,
    };
};
export const setProducts = (payload) => {
    return {
        type:ActionTypes.SET_PRODUCTS,
        payload,
    };
};

// asenkron aksiyon - thunk aksiyonu 

export const getProductData =() => (dispatch) => {
    axios
    .get("http://localhost:4000/products")
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => dispatch(setError()));
}