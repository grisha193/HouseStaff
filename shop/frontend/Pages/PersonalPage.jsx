import React from 'react'
import Header from "../componets/Header";
import { useState } from 'react';
export default function PersonalPage() {
    const [email, setEmail] = useState("info@mail.ru");
    const [subscribedNews, setSubscribedNews] = useState(true);
    const [subscribedOffers, setSubscribedOffers] = useState(true);

    return (
       <div className="wrapper">
            <Header/>
        <div className="personal-account">
            <h1>Личный кабинет</h1>
            <div className="account-sections">

                {/* Персональная информация */}
                <div className="section">
                    <h2>Персональная информация</h2>
                    <p><strong>Фамилия, Имя:</strong> Александров Константин</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Телефон:</strong> +7 921 332 43 65</p>
                    <button>ИЗМЕНИТЬ ДАННЫЕ</button>
                    <button>ИЗМЕНИТЬ ПАРОЛЬ</button>
                </div>


                {/* Подписка на рассылку */}
                <div className="section">
                    <h2>Подписаться на рассылку</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите Ваш Email"
                    />
                    <div>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={subscribedNews} 
                                onChange={() => setSubscribedNews(!subscribedNews)} 
                            />
                            Хочу получать новости
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={subscribedOffers} 
                                onChange={() => setSubscribedOffers(!subscribedOffers)} 
                            />
                            Хочу получать акции
                        </label>
                    </div>
                    <button>СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                </div>

                {/* История заказов */}
                <div className="section">
                    <h2>История заказов</h2>
                    <p>Заказ <strong>№862357</strong> от 06.08.2014 - <strong>22 000 руб.</strong> (В обработке)</p>
                    <p>Заказ <strong>№368359</strong> от 02.07.2013 - <strong>3 180 руб.</strong> (Выполнен)</p>
                    <button>ПОКАЗАТЬ ВСЕ ЗАКАЗЫ</button>
                </div>

                {/* Профили доставки */}
                <div className="section">
                    <h2>Профили доставки</h2>
                    <p><strong>ПО УМОЛЧАНИЮ</strong></p>
                    <p>г. Москва, ул. Большая Ямская, дом 13, корпус 1, квартира 92</p>
                    <button>ИЗМЕНИТЬ</button>
                    <button>УДАЛИТЬ АДРЕС</button>
                    <p>г. Москва, ул. Ленина, дом 1, квартира 154</p>
                    <button>ИЗМЕНИТЬ</button>
                    <button>УДАЛИТЬ АДРЕС</button>
                    <button>ДОБАВИТЬ АДРЕС</button>
                </div>

            </div>
        </div>
        </div>
    );
}