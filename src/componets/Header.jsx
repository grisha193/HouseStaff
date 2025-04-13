import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Order from './Order';
import { NavLink, Outlet } from "react-router-dom";



const showOrders = (props) => {
  let summa = 0
  props.orders.forEach(el => summa += Number.parseFloat(el.price))
  return(<div>
      {props.orders.map(el => (
          <Order onDelete={props.onDelete} key={el.id} item={el}/>
      ))}
      <p className='summa'>Сумма: {new Intl.NumberFormat().format(summa)}</p>
  </div>)
}

const showNothing = () => {
  return(<div className='empty'>
    <h2>Товаров нет</h2>
  </div>)
}

export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false)
  return (
    <header>
    <div>
        <span className='logo'><NavLink
        to="/">House Staff</NavLink></span>
        <ul className='nav'>
        <li>
          <NavLink 
          to="/about">Про нас</NavLink>
          </li>
        <li>
          <NavLink
          to="/contacts"> Контакты </NavLink>
         
          </li>
        <li>
        <NavLink 
        to="/personal"> Кабинет </NavLink> </li> 
     
        <li>
        <NavLink 
        to="/login">Вход </NavLink> </li> 
        </ul>
       
        <FaShoppingCart  onClick={()=> setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`}/>
 
{cartOpen && (
  <div className='shop-cart'>
    {props.orders.length > 0 ?
    showOrders(props) : showNothing()}
        

  </div>
  
)}
</div> 


<Outlet />
</header>
  )
} 
