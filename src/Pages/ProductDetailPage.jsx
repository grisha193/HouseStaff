import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ReviewsList from '../componets/ReviewsList';
import ReviewForm from '../componets/ReviewForm';
import { useAuth } from '../auth/authContext';
import Footer from '../componets/Footer';
import Header from '../componets/Header';


const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/api/items/${id}/full`)
      .then(res => setItem(res.data))
      .catch(err => setError('Товар не найден'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return alert('Авторизуйтесь для добавления в корзину');

    setAdding(true);
    try {
      await api.post('/api/cart', {
        id_user: user.id,
        id_item: item.id,
        count: 1
      });
      alert('Товар добавлен в корзину!');
    } catch (err) {
      alert('Ошибка при добавлении в корзину');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error || !item) return <div className="error-message">{error || 'Ошибка загрузки'}</div>;

  return (
    <div className="wrapper">
    <div className="product-detail-wrapper">
      <div className="product-main">
        <div className="product-image-wrapper">
          <img
            src={`http://localhost:8000/img/products/${item.image}`}
            alt={item.name}
            className="product-image"
          />
        </div>

        <div className="product-info-panel">
          <h1 className="product-name">{item.name}</h1>
          <div className="product-price">{item.price} ₽</div>

          <div className="product-rating">
            <span className="stars">
              {'★'.repeat(Math.round(item.average_score))}{' '}
              {'☆'.repeat(5 - Math.round(item.average_score))}
            </span>
            <span className="score">({item.average_score} / 5)</span>
          </div>

          <div className="product-details">
            <p><strong>Производитель:</strong> {item.producer}</p>
            <p><strong>Материал:</strong> {item.material}</p>
            <p><strong>Цвет:</strong> {item.color}</p>
          </div>

          <p className="product-description">{item.description}</p>

          <button
            className="btn-cart"
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? 'Добавление...' : 'Добавить в корзину'}
          </button>
        </div>
      </div>

      <div className="product-reviews">
        <h2>Отзывы</h2>
        <ReviewsList itemId={item.id} />
        <ReviewForm itemId={item.id} onReviewSubmit={() => window.location.reload()} />
      </div>
    </div>

    </div>
  );
};

export default ProductDetailPage;
