import { useEffect, useState } from 'react';
import api from '../api/axios';

const ReviewsList = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/api/reviews/${itemId}`);
        setReviews(response.data);
      } catch (err) {
        console.error('Ошибка при загрузке отзывов:', err);
        setError(err.response?.data?.message || 'Не удалось загрузить отзывы');
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchReviews();
    }
  }, [itemId]);

  if (loading) return <div>Загрузка отзывов...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reviews-list">
      <h3>Отзывы</h3>
      {reviews.length === 0 ? (
        <p>Пока нет отзывов. Будьте первым!</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <div className="review-header">
                <span className="review-author">
                  {review.user?.name || 'Анонимный пользователь'}
                </span>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < review.score ? "star on" : "star off"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="review-text">{review.text}</div>
              <div className="review-date">
                {new Date(review.created_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsList;