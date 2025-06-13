import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/authContext';
import { useNavigate } from 'react-router-dom';
import Header from '../componets/Header';
import ReviewForm from '../componets/ReviewForm';
import ReviewsList from '../componets/ReviewsList';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone_number: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // Загружаем данные профиля
      const profileRes = await api.get('/api/profile');
      const u = profileRes.data.user;
      setForm({
        fullName: `${u.surname} ${u.name} ${u.second_name}`.trim(),
        email: u.email,
        phone_number: u.phone_number
      });

      // Загружаем заказы с товарами
      const ordersRes = await api.get('/api/orders');
      setOrders(ordersRes.data.orders || []);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const nameParts = (form.fullName || '').trim().split(/\s+/).filter(Boolean);
      const [surname, name, ...rest] = nameParts;
      const second_name = rest.join(' ') || '';

      await api.put('/api/profile', {
        name: name || '',
        surname: surname || '',
        second_name: second_name,
        email: form.email || '',
        phone_number: (form.phone_number || '').replace(/\D/g, '')
      });
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Ошибка при сохранении данных: ' + (error.response?.data?.message || error.message));
    }
  };

const handleOpenReviewForm = (item) => {
    if (!item?.id) {
      console.error('Неверная структура товара:', item);
      alert('Ошибка: некорректные данные товара');
      return;
    }

    setSelectedItem({
      id: item.id, 
      name: item.name
    });
    setShowReviewForm(true);
  };

  const handleReviewSubmit = () => {
    setShowReviewForm(false);
    setSelectedItem(null);
    // Можно обновить список отзывов, если нужно
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="wrapper">
      <Header/>
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Личный кабинет</h1>
          {user ? (
            <button 
              onClick={() => {
                if (window.confirm('Вы уверены, что хотите выйти?')) {
                  logout();
                }
              }}
              className="btn logout-btn"
            >
              Выход
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="btn login-btn"
            >
              Вход
            </button>
          )}
        </div>

        {user ? (
          <>
            {/* Персональные данные */}
            <div className="profile-card">
              <h2 className="section-title">Персональная информация</h2>
              <div className="form-group">
                <label>ФИО:</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="form-group">
                <label>Телефон:</label>
                <input
                  name="phone"
                  value={form.phone_number}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="button-group">
                {!editMode ? (
                  <button className="btn primary" onClick={() => setEditMode(true)}>
                    Изменить данные
                  </button>
                ) : (
                  <>
                    <button className="btn success" onClick={handleSave}>
                      Сохранить
                    </button>
                    <button className="btn" onClick={() => {
                      setEditMode(false);
                      fetchProfile();
                    }}>
                      Отмена
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* История заказов */}
            <div className="profile-card">
              <h2 className="section-title">История заказов</h2>
              {orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div><strong>Заказ №{order.id}</strong></div>
                      <div>Дата: {order.date}</div>
                      <div className="order-total">Общая сумма: {order.total} ₽</div>
                      <div className="status">Статус: Доставлен</div>
                    </div>
                    
                    <div className="order-items">
                      <h4>Состав заказа:</h4>
                      {order.items?.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-info">
                          <div className="item-name">{item.name}</div>
                          <div className="item-details">
                            <span>{item.count} шт. × {item.price} ₽ = {item.count * item.price} ₽</span>
                            <button 
                              onClick={() => handleOpenReviewForm(item)}
                              className="btn small primary"
                            >
                              Оставить отзыв
                            </button>
                          </div>
                        </div>

                        {/* Список отзывов для конкретного товара */}
                        <ReviewsList itemId={item.id} />
                      </div>
                    ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="profile-card">
            <h2>Доступ запрещен</h2>
            <p>Для просмотра этой страницы необходимо авторизоваться</p>
            <button 
              onClick={() => navigate('/login')}
              className="btn primary"
            >
              Перейти на страницу входа
            </button>
          </div>
        )}

        {/* Модальное окно для отзыва */}
        {showReviewForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-btn" 
              onClick={() => setShowReviewForm(false)}
            >
              ×
            </button>
            <h3>Отзыв о товаре: {selectedItem?.name}</h3>
            <ReviewForm 
              itemId={selectedItem?.id}  // ✅ из таблицы items
              onReviewSubmit={handleReviewSubmit}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}