import axios from "axios";
import { ActionTypes } from "../actionTypes";

axios.defaults.baseURL = "http://localhost:4000"

// SENKRON AKSİYONLAR (APİ KULLANIMINA GEREK DUYULMAYANLAR)
 export const setBasketLoading = () => (
    {type:ActionTypes.SET_BASKET_LOADİNG,}
 );

 export const setBasket = (payload) => (
    {type:ActionTypes.SET_BASKET,payload,}
 );

 export const setBasketError = () => (
    {type:ActionTypes.SET_BASKET_ERROR,}
 );


// ASENKRON AKSİYONLAR (APİ KULLANIMINA GEREK DUYANLAR)

// APİ den sepetteki ürünleri alıp store a aktarır
 export const getBasketData = () => (dispatch) => {
   axios.get("/basket")
   .then((res) => dispatch(setBasket(res.data)))
   .catch((err) => dispatch(setBasketError()));
 };
 
// api'deki sepete yeni ürün ekler ve ekleme başarılı olursa eklenen ürünü reducer a aktarır
// yeni eleman eklediğimiz için parametre olarak(product ı) aldık
 export const addToBasket = (product) => (dispatch) => {

   //1. yeni bir obje oluşturup ürünün bilgilerine miktar ekleme
   const newProduct = {...product,adet:1};

   //2. veritabanına eklenmesi gerekmeyen verileri kaldırma
   // delete newProduct.renk(objeden özellik siliyoruz)


   //3. api yeni ürün kaydet
   axios.post("/basket",newProduct)
   .then(res => dispatch({type:ActionTypes.ADD_TO_BASKET,payload:newProduct}))
   .catch((err) => setBasketError());
 };


// api'deki ürünün miktarını arttırır ve reducer a bilgi gönderir 
 export const updateItem = (product) => (dispatch) => {
   axios.patch(`/basket/${product.id}`, {adet : product.adet + 1})
   // api güncellenirse reducer'u güncelleyecek olan aksiyon çalışır
   .then(() => dispatch({type:ActionTypes.UPDETE_ITEM,payload:product.id}))
 };


// api'den bir ürün kaldırır devamında kaldırdığı ürün id'sini reducer'a gönderir
 export const removeItem = (delete_id) => (dispatch) => {
   axios.delete(`/basket/${delete_id}`)
   .then(() =>
   // ekranın güncellenmesi için reducer'a haber verir
    dispatch({type:ActionTypes.REMOVE_ITEM,payload:delete_id}))
 };
   
 