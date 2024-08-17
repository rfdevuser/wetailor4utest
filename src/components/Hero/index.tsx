"use client"
import React from 'react';
import './style.css'; 
import Card from '../Assests/Card';



const cardData = [
    { title: 'A', image: '/images/home-nav/women.jpg' },
    { title: 'B', image: '/images/home-nav/women.jpg' },
    { title: 'C', image: '/images/home-nav/women.jpg' },
    { title: 'E', image: '/images/home-nav/women.jpg' },
    { title: 'F', image: '/images/home-nav/women.jpg' },
    { title: 'G', image: '/images/home-nav/women.jpg' },
    { title: 'H', image: '/images/home-nav/women.jpg' },
    { title: 'I', image: '/images/home-nav/women.jpg' },
    { title: 'J', image: '/images/home-nav/women.jpg' },
  ];
 
const Hero = () => {
    
  return (
    <div className=" mt-10">
      <div className="home-slider">
        {cardData.map((card, index) => (
          <div key={index} className="home-slider-item">
            <Card title={card.title} image={card.image} />
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Hero;
