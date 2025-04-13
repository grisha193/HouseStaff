import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function RegistrationPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [nameOfUser, setNameOfUser] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const isFormValid = login.trim() !== '' && password.trim() !== '' && lastName.trim() !== '' && nameOfUser.trim() !== '' && secondName.trim() !== '' && phoneNumber.trim() !== ''  && email.trim() !== '';

    useEffect(() => {
        const labels = document.querySelectorAll('.form-control label');
        labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                .join('');
        });
    }, []);

    return (
        <div className="wrapper">
            <div className="center">
                <div className="container">
                    <h1>Регистрация</h1>
                    <form>
                        <div className="form-control">
                            <input 
                                type="text" 
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required 
                            />
                            <label>Логин</label>
                        </div>

                        <div className="form-control">
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <label>Пароль</label>
                        </div>

                        <div className="form-control">
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required 
                            />
                            <label>Фамилия</label>
                        </div>
                         
                        <div className="form-control">
                            <input 
                                type="text" 
                                value={nameOfUser}
                                onChange={(e) => setNameOfUser(e.target.value)}
                                required 
                            />
                            <label>Имя</label>
                        </div>
                         
                        <div className="form-control">
                            <input 
                                type="text" 
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                                required 
                            />
                            <label>Отчество</label>
                        </div>
                         
                        <div className="form-control">
                            <input 
                                type="text" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required 
                            />
                            <label>Номер телефона</label>
                        </div>
                        <div className="form-control">
                            <input 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            <label>Почта</label>
                        </div>

                        <NavLink to="/">
                            <button type="submit" className="btn" disabled={!isFormValid}>
                                Регистрация 
                            </button>
                        </NavLink>

                        <p className="text">
                            У вас уже есть аккаунт? <NavLink to="/login">Авторизация</NavLink>
                        </p>
                    </form>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
