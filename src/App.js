import Navbar from './components/Navbar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import {useSelector, useDispatch} from 'react-redux';
import {calculateTotals,getCartItems} from './features/cart/cartSlice'
import {useEffect} from 'react'


function App() {
  const {cartItems,isLoading} = useSelector((state) => state.cart);
  const {isOpen} = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  
useEffect(() => {
    dispatch(calculateTotals());

  },[cartItems])


  useEffect(() => {

    dispatch(getCartItems());

  },[])

  if(isLoading){
    return <div className='loading'>
      <h1>loading...</h1>

    </div>
  }
  return <main>
    {isOpen && <Modal/>}
    <Navbar/>
    <CartContainer/>
  </main>
}
export default App;
