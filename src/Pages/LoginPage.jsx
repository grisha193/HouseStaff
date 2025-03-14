import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const isFormValid = login.trim() !== '' && password.trim() !== '';
    

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
                    <h1>Авторизация</h1>
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

                       
                         <NavLink to="/"><button type="submit" className="btn" disabled={!isFormValid}>
                                Вход 
                            </button>
                        </NavLink>
                       

                        <p className="text">
                            Не имеете аккаунт? <NavLink to="/registration">Регистрация</NavLink>
                        </p>
                    </form>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
