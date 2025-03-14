import React from 'react'
import Header from "../componets/Header";
import Footer from '../componets/Footer';



export default function ContatsPage() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="centered">
        <h2 className="aboutUs_head">Контакты</h2>
        <div className="aboutUs_text">


        <p className="aboutUs_text_first">
            Локация: Краснодар
          </p>

          <p className="aboutUs_text_first">
          Свяжитесь с нами по телефону: +7 (999) 123-45-67  
          </p>

          <p className="aboutUs_text_first">email: info@example.com</p>
         
        

          <p className="aboutUs_text_first">

          </p>
        </div>
        <p className="s">House Staff – всё, что нужно для уюта и комфорта в вашем доме.!</p>
      </div>
      <Footer/>
    </div>
)}
