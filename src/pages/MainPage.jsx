import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getProductData, setError, setLoading, setProducts } from "../redux/actions/productActions";
import Loading from "../components/Loading";
import Card from "../components/Card";
import { getBasketData, setBasketLoading } from "../redux/actions/basketActions";

const MainPage = () => {
const dispatch = useDispatch();

// store'a abone olma
const state = useSelector((store) => store.productReducer )
 
  useEffect(() => {
    //store'daki yükleniyor değerini güncelledik
    dispatch(setLoading());
    dispatch(setBasketLoading());


    //(1.yol) api isteği at,cevaba göre store'u bilgilendir
    // axios
    // .get("http://localhost:4000/products")
    // .then((res) => dispatch(setProducts(res.data)))
    // .catch((err) => dispatch(setError()));

    // (2.yol) thunk aksiyonu ile ürün verisi alma
    dispatch(getProductData());

    // sepet verisi alma
    dispatch(getBasketData());

  },[]);

  // console.log(state)
 

  return <div>
    {/* yükleniyorsa */}
    {state.isLoading && <Loading /> }

    {/* hata olduysa */}
    {state.isError && <p>Üzgünüz...Verileri alırken bir hata oluştu</p> }
      
    <div className="d-flex flex-wrap gap-4 p-5 justify-content-center">
      {/* veriler geldiyse */}
    {state?.products.map((product) => (
          <Card key={product.id} product={product} />
    ))}
    </div>  
    
  </div>
};

export default MainPage