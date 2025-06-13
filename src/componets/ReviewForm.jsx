import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/authContext';

const ReviewForm = ({ itemId, onReviewSubmit }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!itemId || isNaN(Number(itemId))) {
    return (
      <div className="error-message">
        Ошибка: некорректный идентификатор товара. Закройте форму и попробуйте снова.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Для оставления отзыва необходимо авторизоваться');
      return;
    }

    if (!score || !text || text.length < 10) {
      setError('Пожалуйста, поставьте оценку и напишите отзыв (минимум 10 символов)');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/api/reviews', {
        id_user: user.id,
        id_item: Number(itemId),
        text: text,
        score: score
      });

      if (response.data) {
        setText('');
        setScore(0);
        if (onReviewSubmit) onReviewSubmit();
      }
    } catch (err) {
      console.error('Full error:', err);
      
      if (err.response?.data?.available_items) {
        setError(
          `Ошибка: товар с ID ${err.response.data.your_item_id} не существует. ` +
          `Доступные ID товаров: ${err.response.data.available_items.join(', ')}`
        );
      } else if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(', '));
      } else {
        setError(err.response?.data?.message || 'Произошла ошибка при отправке отзыва');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Оставить отзыв</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={star <= (hover || score) ? "star on" : "star off"}
              onClick={() => setScore(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              disabled={isSubmitting}
            >
              <span className="star-icon">★</span>
            </button>
          ))}
        </div>
        
        <div className="form-group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишите ваш отзыв (минимум 10 символов)..."
            rows={4}
            disabled={isSubmitting}
            minLength={10}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn primary" 
          disabled={isSubmitting || !user}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;