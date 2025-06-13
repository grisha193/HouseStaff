import React from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({ item, onDelete, onUpdateQuantity }) => {
  const totalPrice = parseFloat(item.price) * item.count;
  
  return (
    <div className='item'>
      <img
        src={`http://localhost:8000/img/products/${item.image}`}
        alt={item.name}
      />
      <div className="item-info">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <b>{totalPrice.toFixed(2)} руб.</b>
        <small>({item.price} руб. × {item.count} шт.)</small>
      </div>
      
      <div className="quantity-controls">
        <button
          className={`quantity-btn ${item.count === 1 ? 'disabled' : ''}`}
          onClick={() => onUpdateQuantity(item.cartId, item.count - 1)}
          disabled={item.count === 1}
        >
          <FaMinus />
        </button>
        
        <span className="quantity">{item.count}</span>
        
        <button
          className="quantity-btn"
          onClick={() => onUpdateQuantity(item.cartId, item.count + 1)}
        >
          <FaPlus />
        </button>
      </div>
      
      <FaTrash 
        className='delete-icon' 
        onClick={() => onDelete(item.cartId)}
      />
    </div>
  );
};

export default Cart;