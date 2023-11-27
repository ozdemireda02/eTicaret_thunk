import { useDispatch, useSelector } from "react-redux";
import { addToBasket, updateItem } from './../redux/actions/basketActions';

const Card = ({product}) => {
  // sepete abone olma
  const state = useSelector((store) => store.basketReducer);
  const dispatch = useDispatch();
  
  // eleman sepete eklenmiş mi kontrol etme
  const found = state.basket.find((i) => i.id === product.id);
  
  // sepete ekle butonu
    const handleClick = () => {
      if(found){
        // sepetteki elemanı güncelle (patch ile)
        dispatch(updateItem(found));
      }else{
        // sepete yeni eleman ekle (post ile)
        dispatch(addToBasket(product));
      }
    };
  return (
    <div className="card pt-4" style={{width:"18rem"}}>
        <div className="d-flex justify-content-center">
            <img className="rounded " width={200} height={200} src={product.resim}  />
        </div>
        <div className="card-body">
           <h5 className="card-title">{product.baslik}</h5> 
           <p> <span className="fw-bold">{product.marka}</span>  {product.model}</p>
           <p className="d-flex flex-column">{product.ozellikler.map((line) => <span>{line}</span> )}</p>
           <button onClick={handleClick} className="w-100 btn btn-dark d-flex justify-content-between align-items-center" > <span>{found ? ` Miktarı Arttır (${found.adet})` : "Sepete Ekle"}</span> <span className="text-success">{product.fiyat}₺</span> </button>
        </div>
    </div>
  )
}

export default Card