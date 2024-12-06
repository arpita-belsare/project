import useCartStore from "../Zustand/store"
import '../CSS/Cart.css'
const CartPage = () => {
    const cartItems = useCartStore((state) => state.items);
    const clearCart = useCartStore((state)=> state.clearCart);
const handleClearCart = ()=>{
    clearCart();
}
  return (
  <div className="m"> 
    <h1> My Bag - ({cartItems.length} item)</h1>
    <button onClick={handleClearCart} >Clear Cart</button>
    <div className="Cartwrap">
    {
        cartItems?.map((item, index) => (
            <div className="one-cart" key={index}>
                  <img src={item.image} alt={item.title} />
             <h3>{item.title}</h3>
             <h6><p>$40</p>${item.price}</h6>
</div> ))
}
 </div>
  </div>
  )
}

export default CartPage;