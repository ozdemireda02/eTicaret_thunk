import { ActionTypes } from "../actionTypes";

const initialState = {
    isLoading: false,
    isError:false,
    basket:[],
}

const basketReducer = (state = initialState,{type,payload}) => {
    switch(type){
       case ActionTypes.SET_BASKET_LOADİNG:
        return{...state , isLoading: true };

       case ActionTypes.SET_BASKET_ERROR:
        return{...state , isLoading: false , isError: true };
            
       case ActionTypes.SET_BASKET:
        return{...state , isLoading: false, isError: false , basket:payload, };

       case ActionTypes.ADD_TO_BASKET:
        // basket in içine payload ekleme
        return{...state , basket:state.basket.concat(payload)}; 

       case ActionTypes.UPDETE_ITEM:
            // eski elemanı çıkartıp yeni eleman koyma map ile
            const newBasket = state.basket.map((item) => {
               
                if (item.id === payload) {
                    // eğerki eleman güncellenecek eleman ise adetini bir arttırarak yeni diziye ekle
                    return { ...item, adet: item.adet + 1 };
                } else {
                    // değilse direkt yeni diziye ekle
                    return item;
                }
            });
    
         return { ...state, basket: newBasket };
        
        // silinecek id'ye sahip elemanı state'den kaldırır
        case ActionTypes.REMOVE_ITEM:
           const filtred = state.basket.filter((i) => i.id !== payload) ;
           return {...state,basket: filtred};
 
    default:
            return state;
        }
};

export default basketReducer;