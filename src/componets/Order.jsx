import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../api/axios';
import { format } from 'date-fns';

const Order = ({ userId, cartItems, onOrderCreated }) => {
  const [address, setAddress] = useState('');
  const [orderDate, setOrderDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  if (!address.trim() || address.trim().length < 3) {
    setError('Адрес должен содержать минимум 3 символа');
    setIsLoading(false);
    return;
  }

  if (cartItems.length === 0) {
    setError('Добавьте товары в корзину');
    setIsLoading(false);
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/api/orders', {
      id_user: userId,
      address: address.trim(),
      date: format(orderDate, 'yyyy-MM-dd HH:mm:ss'),
      items: cartItems.map(item => ({
        id_item: item.id,
        count: item.count,
        price: parseFloat(item.price) 
      }))
    });
    onOrderCreated(response.data);
    setAddress('');
    alert('Заказ успешно оформлен!');
    } catch (err) {
      let errorMessage = 'Ошибка при оформлении заказа';
      
      if (err.response) {
        // Обработка ошибок от сервера
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      JSON.stringify(err.response.data?.errors) || 
                      errorMessage;
      } else if (err.request) {
        errorMessage = 'Сервер не ответил';
      }

      setError(errorMessage);
      console.error('Order error:', {
        error: err,
        request: {
          userId,
          address,
          date: orderDate,
          items: cartItems
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order-form">
      <h3>Оформление заказа</h3>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="address">Адрес доставки:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            minLength={3}
            placeholder="ул. Примерная, д. 1"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="orderDate">Дата заказа:</label>
          <DatePicker
            id="orderDate"
            selected={orderDate}
            onChange={(date) => setOrderDate(date)}
            minDate={new Date()}
            dateFormat="dd.MM.yyyy"
            required
            className="date-picker-input"
            placeholderText="Выберите дату доставки"
          />
        </div>

        {error && (
          <div className="error-message">
            {typeof error === 'string' && error.includes('{') ? (
              Object.entries(JSON.parse(error)).map(([key, value]) => (
                <div key={key}>{key}: {Array.isArray(value) ? value.join(', ') : value}</div>
              ))
            ) : (
              error
            )}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading || cartItems.length === 0}
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Оформление...
            </>
          ) : 'Оформить заказ'}
        </button>
      </form>
    </div>
  );
};

export default Order;