import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import Cart from './Cart';
import { NavLink, Outlet } from "react-router-dom";
import Order from './Order';

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach(el => summa += Number.parseFloat(el.price) * el.count);
  
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
      
      {/* Показываем форму заказа если есть товары и пользователь авторизован */}
      {props.orders.length > 0 && props.userId && (
        <Order 
          userId={props.userId}
          cartItems={props.orders}
          onOrderCreated={props.onOrderCreated}
        />
      )}
    </div>
  );
};

const showNothing = () => {
  return (
    <div className='empty'>
      <h2>Товаров нет</h2>
    </div>
  );
};

export default function Header(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  let [cartOpen, setCartOpen] = useState(false);
  
  const handleOrderCreated = (order) => {
    // Очищаем корзину после успешного заказа
    props.orders.forEach(item => {
      if (item.cartId) {
        props.onDelete(item.cartId);
      }
    });
    setCartOpen(false);
  };

  return (
    <header>
      <div>
        <span className='logo'>
          <NavLink to="/">House Staff</NavLink>
        </span>
        <div className="burger" onClick={() => setMobileOpen(!mobileOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
<div className={`mobile-nav ${mobileOpen ? 'active' : ''}`}>
  <NavLink to="/about" onClick={() => setMobileOpen(false)}>Про нас</NavLink>
  <NavLink to="/contacts" onClick={() => setMobileOpen(false)}>Контакты</NavLink>
  <NavLink to="/profile" onClick={() => setMobileOpen(false)}>Кабинет</NavLink>
</div>

        <ul className='nav'>
          <li><NavLink to="/about">Про нас</NavLink></li>
          <li><NavLink to="/contacts">Контакты</NavLink></li>
          <li><NavLink to="/profile">Кабинет</NavLink></li>
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
                onUpdateQuantity: props.onUpdateQuantity,
                userId: props.userId,
                onOrderCreated: handleOrderCreated
              }) : 
              showNothing()
            }
          </div>
        )}
      </div> 
      
      <Outlet />
    </header>
  );
}