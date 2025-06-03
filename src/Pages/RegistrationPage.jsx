import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        lastName: '',
        name: '',
        secondName: '',
        phoneNumber: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

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
            const response = await axios.post('/api/register', {
                login: formData.login,
                password: formData.password,
                last_name: formData.lastName,
                name: formData.name,
                second_name: formData.secondName,
                phone_number: formData.phoneNumber,
                email: formData.email
            });

            console.log('Registration successful:', response.data);
            navigate('/login'); // Перенаправляем на страницу входа после успешной регистрации
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Registration error:', error);
                setErrors({ general: 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = Object.values(formData).every(field => field.trim() !== '');

    return (
        <div className="wrapper">
            <div className="center">
                <div className="container">
                    <h1>Регистрация</h1>
                    {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                    
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

                        <div className="form-control">
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required 
                            />
                            <label>Фамилия</label>
                            {errors.last_name && <span className="error-text">{errors.last_name[0]}</span>}
                        </div>
                         
                        <div className="form-control">
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                            <label>Имя</label>
                            {errors.name && <span className="error-text">{errors.name[0]}</span>}
                        </div>
                         
                        <div className="form-control">
                            <input 
                                type="text" 
                                name="secondName"
                                value={formData.secondName}
                                onChange={handleChange}
                            />
                            <label>Отчество</label>
                            {errors.second_name && <span className="error-text">{errors.second_name[0]}</span>}
                        </div>
                         
                        <div className="form-control">
                            <input 
                                type="text" 
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required 
                            />
                            <label>Номер телефона</label>
                            {errors.phone_number && <span className="error-text">{errors.phone_number[0]}</span>}
                        </div>
                        
                        <div className="form-control">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                            <label>Почта</label>
                            {errors.email && <span className="error-text">{errors.email[0]}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className="btn" 
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Регистрация...' : 'Регистрация'}
                        </button>

                        <p className="text">
                            У вас уже есть аккаунт? <NavLink to="/login">Авторизация</NavLink>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    );
}
