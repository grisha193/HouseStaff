import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Cart from './Cart';
import { NavLink, Outlet } from "react-router-dom";

const showOrders = (props) => {
  let summa = 0
  props.orders.forEach(el => summa += Number.parseFloat(el.price) * el.count)
  
  return (
    <div>
      {props.orders.map(el => (
        <Cart 
          onDelete={props.onDelete} 
          onUpdateQuantity={props.onUpdateQuantity}
          key={el.cartId} 
          item={el}
        />
      ))}
      <p className='summa'>Сумма: {new Intl.NumberFormat().format(summa)} руб.</p>
    </div>
  )
}

const showNothing = () => {
  return (
    <div className='empty'>
      <h2>Товаров нет</h2>
    </div>
  )
}

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false)
  
  return (
    <header>
      <div>
        <span className='logo'>
          <NavLink to="/">House Staff</NavLink>
        </span>
        
        <ul className='nav'>
          <li>
            <NavLink to="/about">Про нас</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Контакты</NavLink>
          </li>
          <li>
            <NavLink to="/personal">Кабинет</NavLink>
          </li> 
          <li>
            <NavLink to="/login">Вход</NavLink>
          </li> 
        </ul>
       
        <FaShoppingCart 
          onClick={() => setCartOpen(!cartOpen)} 
          className={`shop-cart-button ${cartOpen && 'active'}`}
        />
 
        {cartOpen && (
          <div className='shop-cart'>
            {props.orders.length > 0 ?
              showOrders({
                orders: props.orders,
                onDelete: props.onDelete,
                onUpdateQuantity: props.onUpdateQuantity
              }) : 
              showNothing()
            }
          </div>
        )}
      </div> 
      
      <Outlet />
    </header>
  )
}