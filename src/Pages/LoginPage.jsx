import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage({ onLogin }) {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Анимация для label
        const labels = document.querySelectorAll('.form-control label');
        labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                .join('');
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await axios.post('/api/login', {
                login: formData.login,
                password: formData.password
            });

            // Вызываем функцию onLogin из пропсов с данными пользователя
            onLogin(response.data.user, response.data.token);
            
            // Перенаправляем на главную страницу после успешного входа
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Обработка ошибок валидации
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                // Неправильные учетные данные
                setErrors({ general: 'Неверный логин или пароль' });
            } else {
                console.error('Login error:', error);
                setErrors({ general: 'Произошла ошибка при входе. Пожалуйста, попробуйте позже.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.login.trim() !== '' && formData.password.trim() !== '';

    return (
        <div className="wrapper">
            <div className="center">
                <div className="container">
                    <h1>Авторизация</h1>
                    {errors.general && <div className="error-message">{errors.general}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <input 
                                type="text" 
                                name="login"
                                value={formData.login}
                                onChange={handleChange}
                                required 
                            />
                            <label>Логин</label>
                            {errors.login && <span className="error-text">{errors.login[0]}</span>}
                        </div>

                        <div className="form-control">
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <label>Пароль</label>
                            {errors.password && <span className="error-text">{errors.password[0]}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className="btn" 
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Вход...' : 'Вход'}
                        </button>

                        <p className="text">
                            Нет аккаунта? <NavLink to="/registration">Регистрация</NavLink>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    );
}