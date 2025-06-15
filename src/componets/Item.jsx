import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, onAdd }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/items/${item.id}`);
  };

  return (
    <div className='item'>
      <img
        src={`http://localhost:8000/img/products/${item.image}`}
        alt={item.name}
        onClick={handleOpen}
        style={{ cursor: 'pointer' }}
      />
      <h2 onClick={handleOpen} style={{ cursor: 'pointer' }}>{item.name}</h2>
      <p>{item.description}</p>
      <b>{item.price} ₽</b>
      <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>
    </div>
  );
};

export default Item;
